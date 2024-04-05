import { useEffect, useRef } from "react"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import useAppStore from "./stores/useAppStore"

export default function Camera({ page }) {

  const camera = useAppStore( state => state[page].camera )
  const cameraRef = useRef()

  useEffect(()=> {
    const onKeyDown = (e) => (e.key == "t") && console.log(cameraRef.current.position)
    document.addEventListener('keydown', onKeyDown)
    return() => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return(
    <>
      <PerspectiveCamera ref={cameraRef} position={camera.position} makeDefault />
      <OrbitControls />
    </>
  )
}