import { useGLTF } from "@react-three/drei"

export default function MapModel(props) {

  const { nodes } = useGLTF('/models/level.glb')

  return(
    <>
      <group dispose={null}>
        <mesh geometry={nodes.Cube.geometry}>
          <meshStandardMaterial color="#606060" flatShading={true} roughness={1} metalness={0} />
        </mesh>

      </group>
    </>
  )
}

useGLTF.preload("/models/level.glb")