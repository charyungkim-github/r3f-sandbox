import { CameraControls, PerspectiveCamera, PointerLockControls } from "@react-three/drei"

import useFpsStore from "./stores/useFpsStore"

export default function Camera() {
  const type = useFpsStore(state => state.camera.type)
  return (
    <>
      { type == 'pointerlock' && <PointerLockControls /> }
      { type == 'orbit' && <CameraControls /> }
      <PerspectiveCamera makeDefault position={[0, 0, 1]} />
    </>
  )
}