import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

export default function Map(props) {

  const { nodes, materials } = useGLTF('/models/map.glb')

  useEffect(()=>{
    for (const key in materials) {
      materials[key].side = 0
    }
  },[])
  return(
    <>
      <group {...props} dispose={null}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh geometry={nodes.Mesh.geometry} material={materials.SKH_Tex_00_Brand_s} />
          <mesh geometry={nodes.Mesh_1.geometry} material={materials.SKH_Glass_s} material-opacity={0.1} />
          <mesh geometry={nodes.Mesh_2.geometry} material={materials.SKH_Tex_01_s} />
          <mesh geometry={nodes.Mesh_3.geometry} material={materials.SKH_Tex_03_s} />
          <mesh geometry={nodes.Mesh_4.geometry} material={materials.SKH_UV_Ani_s} />
          <mesh geometry={nodes.Mesh_5.geometry} material={materials.SKH_Tex_02_s} />
          <mesh geometry={nodes.Mesh_6.geometry} material={materials.SKH_ProductBox_s} />
        </group>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh geometry={nodes.Mesh001.geometry} material={materials.SKH_Tex_00_Store_s} />
          <mesh geometry={nodes.Mesh001_1.geometry} material={materials.SKH_Tex_04_s} />
        </group>
        <mesh geometry={nodes.SKH_04_News_POPUP.geometry} material={materials.SKH_Tex_00_News_POPUP_s} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.SKH_05_Extra.geometry} material={materials.SKH_Tex_00_Extra_s} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh geometry={nodes.Mesh007.geometry} material={materials.SKH_Tex_00_StreetBlock_s} />
          <mesh geometry={nodes.Mesh007_1.geometry} material={materials.SKH_Tile_06_s} />
          <mesh geometry={nodes.Mesh007_2.geometry} material={materials.SKH_Tile_01_s} />
          <mesh geometry={nodes.Mesh007_3.geometry} material={materials.SKH_Tile_02_s} />
          <mesh geometry={nodes.Mesh007_4.geometry} material={materials.SKH_Tile_08_s} />
          <mesh geometry={nodes.Mesh007_5.geometry} material={materials.SKH_Tile_07_s} />
        </group>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh geometry={nodes.Mesh010.geometry} material={materials.SKH_Movie_01_s} />
          <mesh geometry={nodes.Mesh010_1.geometry} material={materials.SKH_Tex_00_Media_s} />
          <mesh geometry={nodes.Mesh010_2.geometry} material={materials.SKH_Movie_02_s} />
        </group>
        <skinnedMesh geometry={nodes.Booster_Balloon_Arm.geometry} material={materials.SKH_Tex_03_s} skeleton={nodes.Booster_Balloon_Arm.skeleton} position={[-28.157, 0, 9.952]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <skinnedMesh geometry={nodes.Booster_Balloon_Buttom.geometry} material={materials.SKH_Tex_00_s} skeleton={nodes.Booster_Balloon_Buttom.skeleton} position={[-28.157, 0, 9.952]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <skinnedMesh geometry={nodes.Booster_Balloon_Cap.geometry} material={materials.SKH_Tex_03_s} skeleton={nodes.Booster_Balloon_Cap.skeleton} position={[-28.157, 0, 9.952]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <skinnedMesh geometry={nodes.Booster_Balloon_Glass.geometry} material={materials.SKH_Tex_03_s} skeleton={nodes.Booster_Balloon_Glass.skeleton} position={[-28.157, 0, 9.952]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <primitive object={nodes.Ballon_ANI_Grp_Buttom} />
        <mesh geometry={nodes.SKH_Antenna_ANI.geometry} material={materials.SKH_Tex_00_s} position={[21.902, 12.002, 14.473]} rotation={[Math.PI / 2, 0, -2.967]} scale={0.01} />
      </group>
    </>
  )
}
useGLTF.preload('/models/map.glb')