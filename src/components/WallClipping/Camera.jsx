import { useEffect, useRef } from "react"
import { CameraControls, PerspectiveCamera, useKeyboardControls } from "@react-three/drei"
import { Vector3 } from "three"

import useWallClippingStore from "./stores/useWallClippingStore"
import { useFrame } from "@react-three/fiber"

const dirVector = new Vector3(0, 0, 0)
const cameraSpeed = 1.5

export default function Camera(props) {
  const camera = useWallClippingStore( state => state.camera )
  const [, get] = useKeyboardControls()

  const cameraRef = useRef()
  const controlsRef = useRef()

  useFrame((state, delta)=> {

    const { forward, backward, left, right, up, down, logCamera } = get()

    if(logCamera) console.log(cameraRef.current.position)
    if(!forward && !backward && !left && !right && !up && !down) return
    const { position, rotation } = cameraRef.current
    dirVector.set(left - right, up - down, backward - forward).normalize().multiplyScalar(cameraSpeed).applyEuler(rotation)
    controlsRef.current.setPosition(position.x + dirVector.x, position.y + dirVector.y, position.z + dirVector.z, true)
  })

  useEffect(()=>{
    controlsRef.current.setPosition(camera.position[0], camera.position[1], camera.position[2], true)
  }, [camera.position])

  return(
    <>
      <PerspectiveCamera ref={cameraRef} position={camera.position} fov={camera.fov} near={camera.near} far={camera.far} makeDefault />
      <CameraControls ref={controlsRef} />
    </>
  )
}