import { KeyboardControls } from "@react-three/drei"
import { Physics } from "@react-three/rapier"

import useWallClippingStore from "./stores/useWallClippingStore"
import WallClippingInspector from "./WallClippingInspector"
import Camera from "./Camera"
import Map from "./Map"

export default function SplattingScene() {
  const physicsDebug = useWallClippingStore (state => state.physics.debug )
  const keyboardMap = useWallClippingStore (state => state.physics.keyboardMap )

  return (
    <>
      <Physics debug={physicsDebug}>
        <KeyboardControls map={keyboardMap}>
          <Camera />
          <Map />
        </KeyboardControls>
      </Physics>
      <WallClippingInspector />
    </>
  )
}