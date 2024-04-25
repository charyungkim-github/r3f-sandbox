import { KeyboardControls, OrbitControls, PerspectiveCamera, PointerLockControls, useGLTF } from "@react-three/drei"
import { useRef } from "react"

import useOctree from "./hooks/useOctree"
import useOctreeHelper from "./hooks/useOctreeHelper"
import Player from "./Player"
import FpsInspector from "./FpsInspector"
import useFpsStore from "./stores/useFpsStore"

export default function FpsScene() {

  const keymap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
    { name: 'logCamera', keys: ['KeyT'] }, // for debug
    { name: 'logPlayer', keys: ['KeyY'] }, // for debug
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
  const controlsRef = useRef()
  const cameraRef = useRef()

  const { nodes, scene } = useGLTF('/models/scene-transformed.glb')
  const octree = useOctree(scene)
  useOctreeHelper(octree)

  return (
    <>
      <Map nodes={nodes} />
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 10, 10]} />
      {/* <OrbitControls /> */}
      { type == 'pointerlock' && <PointerLockControls />}
      <Player octree={octree} />
    </>
  )
}

function Map({ nodes }) {
  return (
    <group dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Suzanne007.geometry} material={nodes.Suzanne007.material} position={[1.74, 1.04, 24.97]} />
    </group>
    )
}
useGLTF.preload('/models/scene-transformed.glb')

// cameraRef.current.getWorldDirection(cameraWorldDirection)
// cameraWorldDirection.cross(cameraRef.current.up)
// cameraWorldDirection.multiplyScalar(-speed)
// cameraRef.current.position.add(cameraWorldDirection)
// controlsRef.current.target.add(cameraWorldDirection)
