import { useRef, useMemo, useEffect } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { Vector3 } from 'three'
import { Capsule } from 'three/examples/jsm/math/Capsule.js'
extend({ Capsule })

import useFpsStore from './stores/useFpsStore'

const direction = new Vector3()
const frontVector = new Vector3()
const sideVector = new Vector3()
const velocity = new Vector3()

export default function Player({ octree, position }) {

  const player = useFpsStore(state => state.player)

  const cameraOffset = useMemo(() => new Vector3(player.cameraOffset[0], player.cameraOffset[1], player.cameraOffset[2]), [player.cameraOffset])
  const capsuleStart = useMemo(() => new Vector3(position[0], 0, position[2]), [position])
  const capsuleEnd = useMemo(() => new Vector3(position[0], player.capsuleHeight, position[2]), [position, player.capsuleHeight])

  const playerRef = useRef(null)
  const playerOnFloor = useRef(false)
  const time = useRef(false)

  const [, get] = useKeyboardControls()

  useEffect(()=> { resetPlayer() }, [position])

  useFrame(({ camera, controls }, delta) => {

    if(!octree) return

    /* Key inputs */
    const { forward, backward, left, right, jump, logCamera, logPlayer } = get()

    // log
    if(logCamera) console.log(camera, camera.position)
    if(logPlayer) console.log(playerRef.current)

    // forward, backward, left, right
    frontVector.set(0, 0, backward - forward)
    sideVector.set(left - right, 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(player.speed).applyEuler(camera.rotation)
    velocity.set(direction.x, velocity.y, direction.z)

    // jump or gravity
    if (!playerOnFloor.current) velocity.y -= player.gravity * delta
    else if(jump) velocity.y = player.jumpForce

    // check intersection
    const intersection = octree.capsuleIntersect(playerRef.current)

    // check is floor
    playerOnFloor.current = intersection && intersection.normal.y > 0

    // move player
    playerRef.current.translate(velocity.clone().multiplyScalar(delta))
    if(intersection) playerRef.current.translate(intersection.normal.multiplyScalar(intersection.depth))

    // move camera
    const targetPosition = playerRef.current.end.clone().add(cameraOffset)
    camera.position.copy(targetPosition)
    // controls.moveTo(targetPosition.x, targetPosition.y, targetPosition.z, true)

    // camera shake
    if (forward || backward || left || right) time.current += delta
    camera.position.y += Math.sin(time.current * player.shakeFrequency) * player.shakeAmplitude

    // reset player on fall down
    if (camera.position.y <= -2) resetPlayer()
  })

  // reset
  function resetPlayer() {
    direction.set(0, 0, 0)
    frontVector.set(0, 0, 0)
    sideVector.set(0, 0, 0)
    velocity.set(0, 0, 0)
    playerRef.current.start.copy(capsuleStart)
    playerRef.current.end.copy(capsuleEnd)
    playerRef.current.translate(new Vector3(position[0], position[1], position[2]))
  }

  return(
    <>
      <capsule args={[capsuleStart.clone(), capsuleEnd.clone(), player.capsuleRadius]} ref={playerRef} />
    </>
  )
}