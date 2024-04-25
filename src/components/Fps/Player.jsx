import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { Vector3 } from 'three'
import { Capsule } from 'three/examples/jsm/math/Capsule.js'

const GRAVITY = 30
const SPEED = 25
const SPEED_ON_AIR = 8
const DAMPING = 4

const RADIUS = 0.5

export default function Player({ octree }) {

  const playerOnFloor = useRef(false)
  const playerVelocity = useMemo(() => new Vector3(), [])
  const playerDirection = useMemo(() => new Vector3(), [])
  const capsule = useMemo(() => new Capsule(new Vector3(0, 10, 0), new Vector3(0, 11, 0), RADIUS), [])

  const [, get] = useKeyboardControls()

  useFrame(({ camera }, delta) => {

    /* Key inputs */
    const { forward, backward, left, right, jump, logCamera } = get()

    // apply movement velocity
    if(left || right || forward || backward) {
      applyKeyboardMovement(camera, delta, forward, backward, left, right)
    }

    // update jump velocity
    if (jump){
      if (playerOnFloor.current) playerVelocity.y = 10
    }

    /* Gravity */
    const deltaSteps = Math.min(0.05, delta) / 1
    applyGravity(deltaSteps)

    /* Collision */
    const intersection = octree.capsuleIntersect(capsule)
    applyCollision(intersection)

    // update camaera position
    camera.position.copy(capsule.end)

    // reset player on fall down
    if (camera.position.y <= -2) {
      playerVelocity.set(0, 0, 0)
      capsule.start.set(0, 10, 0)
      capsule.end.set(0, 11, 0)
      camera.position.copy(capsule.end)
      camera.rotation.set(0, 0, 0)
    }
  })

  // key input
  function applyKeyboardMovement(camera, delta, forward, backward, left, right) {

    // get speed
    const speed = playerOnFloor.current ? SPEED : SPEED_ON_AIR
    const speedDir = backward || left ? -1 : 1
    const speedDelta = delta * speed * speedDir

    // direction
    camera.getWorldDirection(playerDirection)
    playerDirection.y = 0
    playerDirection.normalize()
    if(left || right) playerDirection.cross(camera.up)
    playerDirection.multiplyScalar(speedDelta)

    // velocity
    playerVelocity.add(playerDirection)
  }

  // physics
  function applyGravity(deltaSteps) {

    let damping = Math.exp(-DAMPING * deltaSteps) - 1

    // on air
    if (!playerOnFloor.current) {
      playerVelocity.y -= GRAVITY * deltaSteps
      damping *= 0.1
    }

    // damping
    playerVelocity.addScaledVector(playerVelocity, damping)

    // apply on capsule
    capsule.translate(playerVelocity.clone().multiplyScalar(deltaSteps))
  }

  function applyCollision(intersection) {
    playerOnFloor.current = false
    if (intersection) {

      // check if player is on floor
      playerOnFloor.current = intersection.normal.y > 0

      // slope
      if (!playerOnFloor.current) {
        playerVelocity.addScaledVector(intersection.normal, -intersection.normal.dot(playerVelocity))
      }

      // apply on calsule
      capsule.translate(intersection.normal.multiplyScalar(intersection.depth))
    }
  }
}