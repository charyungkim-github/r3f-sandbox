import { forwardRef, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { CapsuleCollider, RigidBody } from "@react-three/rapier"
import { CameraControls, PerspectiveCamera, useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei"
import { Vector3 } from "three"

import useWallClippingStore from "./stores/useWallClippingStore"

const SPEED = 10
const direction = new Vector3()
const frontVector = new Vector3()
const sideVector = new Vector3()
const upVector = new Vector3(0, 1, 0)
// const smoothDamp = new SmoothDamp(0.1, 100)
const initPlayerPos = new Vector3(43.88, 3, -50)
let currentAngle = 0

export default function Player({path, ...props}) {

  const physicsRef = useRef()
  const playerRef = useRef()
  const cameraRef = useRef()

  const [, get] = useKeyboardControls()

  useFrame((state, delta)=> {

    const { forward, backward, leftward, rightward, jump, run, logCamera, logPlayer } = get()

    if(logCamera) console.log(cameraRef.current)
    if(logPlayer) console.log(physicsRef.current.translation())

    const velocity = physicsRef.current.linvel()

    // player's movement
    const _frontVector = backward - forward
    const _sideVector = leftward - rightward
    frontVector.set(0, 0, _frontVector)
    sideVector.set(_sideVector, 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation)
    physicsRef.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })

    // player's rotation
    let targetAngle = (direction.length() !== 0) ? Math.atan2(direction.x, direction.z) : currentAngle
    const angleDelta = targetAngle - currentAngle
    if (Math.abs(angleDelta) > Math.PI) targetAngle = targetAngle - Math.sign(angleDelta) * Math.PI * 2
    currentAngle = smoothDamp(currentAngle, targetAngle, delta)
    if (currentAngle > Math.PI) currentAngle -= Math.PI * 2
    if (currentAngle < -Math.PI) currentAngle += Math.PI * 2
    playerRef.current?.setRotationFromAxisAngle(upVector, currentAngle)

    const playerPosition = physicsRef.current.translation()
    cameraRef.current.setTarget(playerPosition.x, playerPosition.y, playerPosition.z, true)
  })

  return (
    <>
      <RigidBody name='player' ref={physicsRef} colliders={false} mass={1} type="dynamic" enabledRotations={[false, false, false]} position={[0, 1, 0]} friction={0}>
        <CapsuleCollider args={[0.6, 0.3]} />
        <PlayerModel ref={playerRef} scale={10} position-y={-0.9}/>
        <Camera ref={cameraRef} />
      </RigidBody>
    </>
  )
}

function smoothDamp(current, target, deltaTime, smoothTime = 0.1, maxSpeed = 100) {
  if (smoothTime <= 0) return target

  const smoothTimeFactor = 2 / smoothTime

  const difference = target - current
  const clampDifference = Math.max(-maxSpeed * deltaTime, Math.min(difference, maxSpeed * deltaTime))
  const targetValue = current + clampDifference

  const moveAmount = targetValue - current
  return current + moveAmount * Math.min(1, Math.abs(moveAmount) * smoothTimeFactor)
}


const Camera = forwardRef( (props, ref) => {
  const camera = useWallClippingStore( state => state.camera )

  useEffect(()=>{
    ref.current.setTarget(camera.lookAt[0], camera.lookAt[1], camera.lookAt[2], true)
  }, [camera.lookAt])

  useEffect(()=>{
    ref.current.setPosition(camera.offset[0], camera.offset[1], camera.offset[2], true)
  }, [camera.offset])

  return(
    <>
      <CameraControls ref={ref} dollySpeed={camera.dollySpeed} minPolarAngle={camera.minPolarAngle} maxPolarAngle={camera.maxPolarAngle} makeDefault />
      <PerspectiveCamera position={camera.offset} fov={camera.fov} near={camera.near} far={camera.far} makeDefault />
    </>
  )
})

const PlayerModel = forwardRef( (props, ref) => {
  const { nodes, materials, animations } = useGLTF('/models/player.glb')
  const { actions } = useAnimations(animations, ref)

  useEffect(()=>{
    actions["Main_Idle"].reset().play()
  }, [])

  return (
    <group ref={ref} {...props} dispose={null} >
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
        </group>
        <skinnedMesh name="Main_Body" geometry={nodes.Main_Body.geometry} material={materials.Main_Body_s} skeleton={nodes.Main_Body.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <skinnedMesh name="Main_Outfit" geometry={nodes.Main_Outfit.geometry} material={materials.Main_Outfit_s} skeleton={nodes.Main_Outfit.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </group>
    </group>
  )
})
useGLTF.preload('/models/player.glb')
