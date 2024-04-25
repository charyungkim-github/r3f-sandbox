import { useGLTF } from "@react-three/drei"

export default function Map(props) {

  const { nodes, materials } = useGLTF('/models/showroom_01.glb')

  return(
    <group {...props} dispose={null}>
      <mesh geometry={nodes.KIA_Showroom__ENV.geometry} material={materials.KIA_Showroom__ENV_s} position={[0, -0.175, 0]} />
      <mesh geometry={nodes.Ceiling.geometry} material={materials.ceiling_s} />
      <mesh geometry={nodes.Glass_Bar.geometry} material={materials.Glass_Bar_s} />
      <mesh geometry={nodes.Interior_01.geometry} material={materials.Interior_01_s} />
      <mesh geometry={nodes.Light_Line.geometry} material={materials.Light_Line_s} />
      <mesh geometry={nodes.Showroom.geometry} material={materials.Showroom_s} />
      <mesh geometry={nodes.Floor_02.geometry} material={materials.Floor_02_s} />
      <mesh geometry={nodes.Floor_01.geometry} material={materials.Floor_01_s} />
      <mesh geometry={nodes.Interior_03.geometry} material={materials.Interior_03_s} />
      <mesh geometry={nodes.Interior_02.geometry} material={materials.Interior_02_s} />
      <mesh geometry={nodes.Screen.geometry} materiak={materials.screen_s} />
    </group>
  )
}
useGLTF.preload('/models/showroom_01.glb')