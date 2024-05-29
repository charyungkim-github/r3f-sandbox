import { forwardRef } from "react"
import { useGLTF } from "@react-three/drei"

const NavmeshModel = forwardRef((props, ref) => {

  const { nodes } = useGLTF('/models/level-nav.glb')

  return(
    <group dispose={null}>
      <mesh ref={ref} geometry={nodes.Navmesh_Mesh.geometry} {...props}>
        <meshBasicMaterial color='#ffffff' opacity={0.75} transparent={true} />
      </mesh>
    </group>
  )
})

useGLTF.preload("/models/level-nav.glb")
export default NavmeshModel