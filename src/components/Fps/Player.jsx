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
  },[position])

  useFrame(({camera}, delta) => {

    if(!octree) return

    /* Key inputs */
    const { forward, backward, left, right, jump, logCamera, logPlayer } = get()

    if(logCamera) console.log(camera, camera.position)
    if(logPlayer) console.log(capsule)

    // apply movement velocity
    if(forward) applyKeyboardMovement(camera, delta, false)
    if(backward) applyKeyboardMovement(camera, -delta, false)
    if(left) applyKeyboardMovement(camera, -delta, true)
    if(right) applyKeyboardMovement(camera, delta, true)
    if (jump && playerOnFloor.current) playerVelocity.y = 10

    /* Damping */
    applyDamping(delta)

    /* Collision */
    const intersection = octree.capsuleIntersect(capsule)
    applyCollision(intersection)

    // update camaera position
    camera.position.copy(capsule.end.clone().add(cameraOffset)) // update camera position

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

  // physics
  function applyDamping(delta) {

    let damping = Math.exp(-player.damping * delta) - 1

    // on air
    if (!playerOnFloor.current) {
      playerVelocity.y -= player.gravity * delta
      damping *= 0.1
    }

    // damping
    playerVelocity.addScaledVector(playerVelocity, damping)

    // apply on capsule
    capsule.translate(playerVelocity.clone().multiplyScalar(delta))
  }

  function applyCollision(intersection) {

    // check if player is on floor
    playerOnFloor.current = intersection && intersection.normal.y > 0

    if (intersection) {

      // slope
      if (!playerOnFloor.current) {
        playerVelocity.addScaledVector(intersection.normal, -intersection.normal.dot(playerVelocity))
      }

      // apply on calsule
      capsule.translate(intersection.normal.multiplyScalar(intersection.depth))
    }
  }
}