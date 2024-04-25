import { useEffect } from "react"
import { useGLTF } from "@react-three/drei"

import useOctree from "./hooks/useOctree"
import useOctreeHelper from "./hooks/useOctreeHelper"
import useFpsStore from "./stores/useFpsStore"

export default function Collider ({setOctree}) {

  const enableOctreeMesh = useFpsStore(state => state.debug.enableOctreeMesh)

  // TODO :: make custom collider (boxes)

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