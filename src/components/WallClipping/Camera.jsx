import { useEffect, useRef } from "react"
import { CameraControls, PerspectiveCamera, useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

import useWallClippingStore from "./stores/useWallClippingStore"

export default function Camera(props) {

  const controls = useWallClippingStore( state => state.controls )
  const [, get] = useKeyboardControls()

  const cameraRef = useRef()
  const controlsRef = useRef()

  useFrame(()=> {

    if(!controls.enable) return
    const { forward, backward, left, right, up, down, logCamera } = get()

    if(logCamera) console.log(cameraRef.current.position)
    if(!forward && !backward && !left && !right && !up && !down) return

    const x = right - left
    const y = up - down
    const z = forward - backward
    const transition = false

    controlsRef.current.truck(x * controls.truckSpeed, y * controls.truckSpeed, transition)
    controlsRef.current.dolly(z * controls.dollySpeed, transition)
  })

  useEffect(()=>{
    controlsRef.current.setPosition(controls.position[0], controls.position[1], controls.position[2], true)
  }, [controls.position])

  return (
    <>
      { controls.enable &&
        <>
          <PerspectiveCamera ref={cameraRef} position={controls.position} fov={controls.fov} near={controls.near} far={controls.far} makeDefault />
          <CameraControls ref={controlsRef} />
        </> }
    </>
  )
}