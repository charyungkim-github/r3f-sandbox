import { useRef } from "react"
import { KeyboardControls, PerspectiveCamera, PointerLockControls, useGLTF } from "@react-three/drei"

import Player from "./Player"
import FpsInspector from "./FpsInspector"
import useOctree from "./hooks/useOctree"
import useOctreeHelper from "./hooks/useOctreeHelper"
import useFpsStore from "./stores/useFpsStore"

export default function FpsScene() {

  const keymap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
  ]

  return (
    <>
      <KeyboardControls map={keymap}>
        <Game />
      </KeyboardControls>
      <FpsInspector />
    </>
  )
}

function Game() {

  const type = useFpsStore(state => state.camera.type)

  const cameraRef = useRef()

  const { nodes, scene } = useGLTF('/models/scene-transformed.glb')
  const octree = useOctree(scene)
  useOctreeHelper(octree)

  return (
    <>
      <MapCollider nodes={nodes} />
      <PerspectiveCamera ref={cameraRef} makeDefault />
      { type == 'pointerlock' && <PointerLockControls />}
      <Player octree={octree} position={[0, 0, 0]} />
    </>
  )
}

function MapCollider({ nodes }) {
  return (
    <group dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Suzanne007.geometry} material={nodes.Suzanne007.material} position={[1.74, 1.04, 24.97]} />
    </group>
    )
}
useGLTF.preload('/models/scene-transformed.glb')