import { useEffect, useRef } from "react"

import useOctree from "./hooks/useOctree"
import useOctreeHelper from "./hooks/useOctreeHelper"
import useFpsStore from "./stores/useFpsStore"

export default function Collider ({setOctree}) {

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

    </group>
  )
}

function Box(props) {

  const enableOctreeMesh = useFpsStore(state => state.debug.enableOctreeMesh)

  return(
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="aquamarine" visible={enableOctreeMesh}/>
    </mesh>
  )
}