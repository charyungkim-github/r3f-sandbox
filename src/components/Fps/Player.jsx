import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { Vector3 } from 'three'
import { Capsule } from 'three/examples/jsm/math/Capsule.js'

import useFpsStore from './stores/useFpsStore'

export default function Player({ octree, position }) {

  const player = useFpsStore(state => state.player)

  const playerVelocity = useMemo(() => new Vector3(), [])
  const playerDirection = useMemo(() => new Vector3(), [])
  const cameraOffset = useMemo(() => new Vector3(player.cameraOffset[0], player.cameraOffset[1], player.cameraOffset[2]), [player.cameraOffset])
  const capsuleStart = useMemo(() => new Vector3(0, 0, 0), [])
  const capsuleEnd = useMemo(() => new Vector3(0, player.capsuleHeight, 0), [player.capsuleHeight])
  const capsule = useMemo(() => new Capsule(capsuleStart.clone(), capsuleEnd.clone(), player.capsuleRadius), [capsuleStart, capsuleEnd])

  const playerOnFloor = useRef(false)

  const [, get] = useKeyboardControls()

  useEffect(()=>{
    capsule.translate(new Vector3(position[0], position[1], position[2]))
  }, [position])

  useFrame(({ camera, controls }, delta) => {

    if(!octree) return

    /* Key inputs */
    const { forward, backward, left, right, jump, logCamera, logPlayer } = get()

    // log
    if(logCamera) console.log(camera, camera.position)
    if(logPlayer) console.log(capsule)

    // apply movement velocity
    if(forward) applyKeyboardMovement(camera, delta, false)
    if(backward) applyKeyboardMovement(camera, -delta, false)
    if(left) applyKeyboardMovement(camera, -delta, true)
    if(right) applyKeyboardMovement(camera, delta, true)
    if (jump && playerOnFloor.current) playerVelocity.y = player.jumpForce

    // check intersection
    const intersection = octree.capsuleIntersect(capsule)

    // apply velocity
    applyVelocity(intersection, delta)

    // apply translation
    applyTranslation(intersection, delta, camera) // camera || controls

    // reset player on fall down
    if (camera.position.y <= -2) resetPlayer()
  })

  // reset
  function resetPlayer() {
    playerVelocity.set(0, 0, 0)
    capsule.start.copy(capsuleStart)
    capsule.end.copy(capsuleEnd)
  }

  // key input
  function applyKeyboardMovement(camera, delta, isSide) {

    // speed
    const speed = playerOnFloor.current ? player.speed : player.speed * 0.1
    const speedDelta = speed * delta

    // movement
    camera.getWorldDirection(playerDirection)
    playerDirection.y = 0
    playerDirection.normalize()
    if(isSide) playerDirection.cross(camera.up)
    playerDirection.multiplyScalar(speedDelta)
    playerVelocity.add(playerDirection)
  }

  function applyVelocity(intersection, delta) {

    const damping = Math.exp(-player.damping * delta) - 1

    // chekc is floor
    playerOnFloor.current = intersection && intersection.normal.y > 0

    // apply velocity
    if(playerOnFloor.current) playerVelocity.addScaledVector(playerVelocity, damping)
    else playerVelocity.y -= player.gravity * delta
  }

  function applyTranslation(intersection, delta, camera) {

    // player
    capsule.translate(playerVelocity.clone().multiplyScalar(delta))
    if(intersection) capsule.translate(intersection.normal.multiplyScalar(intersection.depth))

    // camera
    const targetPosition = capsule.end.clone().add(cameraOffset)
    if(camera.isCamera) camera.position.copy(targetPosition)
    else camera.moveTo(targetPosition.x, targetPosition.y, targetPosition.z, false)
  }
}