import { useEffect, useRef } from "react"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"

import useSplattingStore from "../SplattingMaterial/stores/useSplattingStore"
import useNavigationStore from "../Navigation/stores/useNavigationStore"

export default function Camera({ page }) {

  const cameraRef = useRef()
  const splattingCamera = useSplattingStore( state => state.camera )
  const navigationCamera = useNavigationStore( state => state.camera )

  let camera
  switch (page) {
    case 'splatting':
      camera = splattingCamera
      break
    case 'navigation':
      camera = navigationCamera
      break
    default:
      break
  }

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