import { useState } from "react"
import { KeyboardControls, useGLTF } from "@react-three/drei"

import Camera from "./Camera"
import { PrimitiveCollider } from "./Collider"
import Map from "./Map"
import Cars from "./Cars"
import Player from "./Player"
import FpsInspector from "./FpsInspector"
import useFpsStore from "./stores/useFpsStore"

export default function FpsScene() {

  const keymap = useFpsStore(state => state.keymap)

  const [octree, setOctree] = useState()

  return (
    <>
      <KeyboardControls map={keymap}>
        <Camera />
        <PrimitiveCollider setOctree={setOctree} />
        <Player octree={octree} position={[0, 2, 1]} />
        <Map />
        <Cars />
      </KeyboardControls>
      <FpsInspector />
    </>
  )
}


useGLTF.preload('/models/scene-transformed.glb')