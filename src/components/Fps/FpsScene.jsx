import { useState } from "react"
import { KeyboardControls } from "@react-three/drei"

import Map from "./Map"
import Cars from "./Cars"
import Camera from "./Camera"
import Player from "./Player"
import { PrimitiveCollider } from "./Collider"
import FpsInspector from "./FpsInspector"
import useFpsStore from "./stores/useFpsStore"

export default function FpsScene() {

  const keymap = useFpsStore(state => state.keymap)

  const [octree, setOctree] = useState(null)

  return (
    <>
      <KeyboardControls map={keymap}>
        <Map />
        <Cars />
        <Camera />
        <Player octree={octree} position={[-3, 0, 0]} />
        <PrimitiveCollider setOctree={setOctree} />
      </KeyboardControls>
      <FpsInspector />
    </>
  )
}