import { useEffect, useRef } from "react"
import { CameraControls, PerspectiveCamera, useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

import useWallClippingStore from "./stores/useWallClippingStore"

export default function Camera(props) {
  const camera = useWallClippingStore( state => state.camera )
  const [, get] = useKeyboardControls()

  const cameraRef = useRef()
  const controlsRef = useRef()

  useFrame((state, delta)=> {

    const { forward, backward, left, right, up, down, logCamera } = get()

    if(logCamera) console.log(cameraRef.current.position)
    if(!forward && !backward && !left && !right && !up && !down) return

    const x = right - left
    const y = up - down
    const z = forward - backward

    controlsRef.current.truck(x * camera.truckSpeed, y * camera.truckSpeed, false)
    controlsRef.current.dolly(z * camera.dollySpeed, false)
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