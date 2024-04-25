import { KeyboardControls, useGLTF } from "@react-three/drei"

import Camera from "./Camera"
import Player from "./Player"
import FpsInspector from "./FpsInspector"
import useOctree from "./hooks/useOctree"
import useOctreeHelper from "./hooks/useOctreeHelper"
import useFpsStore from "./stores/useFpsStore"
import DebugOctreeMesh from "./DebugOctreeMesh"

export default function FpsScene() {

  const keymap = useFpsStore(state => state.keymap)

  const { nodes, scene } = useGLTF('/models/scene-transformed.glb')
  const octree = useOctree(scene)
  useOctreeHelper(octree)

  return (
    <>
      <KeyboardControls map={keymap}>
        <Camera />
        <Player octree={octree} position={[0, 0, 1]} />
        <DebugOctreeMesh nodes={nodes} />
      </KeyboardControls>
      <FpsInspector />
    </>
  )
}


useGLTF.preload('/models/scene-transformed.glb')