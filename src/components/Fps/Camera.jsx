import { CameraControls, PerspectiveCamera, PointerLockControls } from "@react-three/drei"

import useFpsStore from "./stores/useFpsStore"

export default function Camera() {
  const type = useFpsStore(state => state.camera.type)

  return (
    <>
      { type == 'pointerlock' && <PointerLockControls makeDefault /> }
      { type == 'orbit' && <CameraControls minDistance={0.5} maxDistance={1.5} makeDefault /> }
      <PerspectiveCamera makeDefault position={[0, 0, 1]}/>
    </>
  )
}