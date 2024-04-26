import { useEffect, useRef } from "react"
import { useGLTF } from "@react-three/drei"

import useOctree from "./hooks/useOctree"
import useOctreeHelper from "./hooks/useOctreeHelper"
import useFpsStore from "./stores/useFpsStore"

export default function Collider ({ setOctree }) {

  const colliderModelsRef = useRef()

  const octree = useOctree(colliderModelsRef.current)
  useOctreeHelper(octree)

  useEffect(() => {
    octree && setOctree(octree)
  }, [octree])

  return(
    <group ref={colliderModelsRef}>

      {/* Cars */}
      <Box position={[6, 1, -2.8]} scale={[4, 2, 2]} />
      <Box position={[6, 1, 2.9]} scale={[4, 2, 2]} />
      <Box position={[0.6, 1, -5.6]} rotation={[0, 0.95, 0]} scale={[4, 2, 2]} />
      <Box position={[0.75, 1, 5.6]} rotation={[0, -0.95, 0]} scale={[4, 2, 2]} />
      <Box position={[-6, 1, -2.8]} scale={[4, 2, 2]} />
      <Box position={[-6, 1, 2.9]} scale={[4, 2, 2]} />

      {/* Floor */}
      <Box position={[0, -0.5, 0]} scale={[50, 1, 50]} />

      {/* Walls */}
      <Box position={[0, 1, 12]} scale={[35, 4, 2]} />
      <Box position={[0, 1, -12]} scale={[35, 4, 2]} />
      <Box position={[-12, 1, 0]} scale={[2, 4, 35]} />
      <Box position={[15, 1, 0]} scale={[2, 4, 35]} rotation={[0, 0.2, 0]}/>
    </group>
  )
}

function Box(props) {

  const enableOctreeMesh = useFpsStore(state => state.debug.enableOctreeMesh)

  return(
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="aquamarine" visible={enableOctreeMesh} opacity={0.5} transparent={true} />
    </mesh>
  )
}

export function GltfCollider ({ setOctree }) {

  const enableOctreeMesh = useFpsStore(state => state.debug.enableOctreeMesh)

  const { nodes, scene } = useGLTF('/models/scene-transformed.glb')
  const octree = useOctree(scene)
  useOctreeHelper(octree)

  useEffect(() => { setOctree(octree) }, [])

  return(
    <>
    { enableOctreeMesh &&
      <group dispose={null}>
        <mesh castShadow receiveShadow geometry={nodes.Suzanne007.geometry} material={nodes.Suzanne007.material} position={[1.74, 1.04, 24.97]} />
      </group> }
    </>
  )
}
useGLTF.preload('/models/scene-transformed.glb')