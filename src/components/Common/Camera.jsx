import { useEffect, useRef } from "react"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"

import useSplattingStore from "../SplattingMaterial/stores/useSplattingStore"
import useNavigationStore from "../Navigation/stores/useNavigationStore"
import useVideoStore from "../Video/stores/useVideoStore"

export default function Camera({ page }) {

  const cameraRef = useRef()
  const splattingCamera = useSplattingStore( state => state.camera )
  const navigationCamera = useNavigationStore( state => state.camera )
  const videoCamera = useVideoStore( state => state.camera )

  let camera
  switch (page) {
    case 'splatting':
      camera = splattingCamera
      break
    case 'navigation':
      camera = navigationCamera
      break
    case 'video':
      camera = videoCamera
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