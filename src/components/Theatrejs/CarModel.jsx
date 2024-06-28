
import { useGLTF } from "@react-three/drei"
import { useEffect } from 'react'
import { Color, MeshPhysicalMaterial } from 'three'
import CustomShaderMaterialImpl from 'three-custom-shader-material/vanilla'

import { fresnelFragmentShader, fresnelVertexShader } from './Fresnel'

export default function CarModel(props) {

  const ev6_matt_gray = {
    diffuseColor: '#747880',
    edgeColor: '#939393',
    fresnelPower: 0.5,
    roughness: 0.5,
    metalness: 1.0,
    clearcoat: 0.01,
    clearcoatRoughness: 0.03
  }

  const { nodes, materials } = useGLTF("/models/car.glb")

  useEffect(() => {
    const fresnelMaterial = new CustomShaderMaterialImpl({
      silent: true,
      baseMaterial: MeshPhysicalMaterial,
      vertexShader: fresnelVertexShader,
      fragmentShader: fresnelFragmentShader,
      uniforms: {
        u_diffuse: { value: new Color(ev6_matt_gray.diffuseColor) },
        u_edgeColor: { value: new Color(ev6_matt_gray.edgeColor) },
        u_power: { value: ev6_matt_gray.fresnelPower },
        u_intensity: { value: 1 }
      }
    })

    fresnelMaterial.aoMap = materials.EV6_Chrome_s.aoMap // copy aoMap from another material
    fresnelMaterial.aoMapIntensity = 1
    fresnelMaterial.roughness = ev6_matt_gray.roughness
    fresnelMaterial.metalness = ev6_matt_gray.metalness
    fresnelMaterial.clearcoat = ev6_matt_gray.clearcoat
    fresnelMaterial.clearcoatRoughness = ev6_matt_gray.clearcoatRoughness

    materials.EV6_PaintColor_s = fresnelMaterial

    materials.EV6_WindowGlass_s.color = new Color('#707576')
    materials.EV6_WindowGlass_s.transmission = 1
    materials.EV6_WindowGlass_s.roughness = 0
    materials.EV6_WindowGlass_s.depthWrite = true
    materials.EV6_WindowGlass_s.transparent = true
    materials.EV6_WindowGlass_s.opacity = 0.7

    materials.EV6_ShdP_s.blending = 4
    materials.EV6_ShdP_s.toneMapped = false
    materials.EV6_ShdP_s.side = 0
  }, [ev6_matt_gray])

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.K_EV_ShdP.geometry} material={materials.EV6_ShdP_s} />
      <mesh geometry={nodes.Mesh160.geometry} material={materials.EV6_Chrome_s} />
      <mesh geometry={nodes.Mesh160_1.geometry} material={materials.EV6_PaintColor_s} />
      <mesh geometry={nodes.Mesh160_2.geometry} material={materials.EV6_Black50_s} />
      <mesh geometry={nodes.Mesh160_3.geometry} material={materials.EV6_WindowGlass_s} />
      <mesh geometry={nodes.Mesh160_4.geometry} material={materials.EV6_Black_Shiny_s} />
      <mesh geometry={nodes.Mesh160_5.geometry} material={materials.EV6_Brakes_s} />
      <mesh geometry={nodes.Mesh160_6.geometry} material={materials.EV6_GT_Caliper_s} />
      <mesh geometry={nodes.Mesh160_7.geometry} material={materials.EV6_Tire_s} />
      <mesh geometry={nodes.Mesh160_8.geometry} material={materials.EV6_Silver_s} />
      <mesh geometry={nodes.Mesh160_9.geometry} material={materials.EV6_Black_s} />
      <mesh geometry={nodes.Mesh160_10.geometry} material={materials.EV6_RedBump_s} />
      <mesh geometry={nodes.Mesh160_11.geometry} material={materials.EV6_Lamp_Clear_s} />
      <mesh geometry={nodes.Mesh160_12.geometry} material={materials.EV6_Lights_s} />
      <mesh geometry={nodes.Mesh160_13.geometry} material={materials.EV6_NumPlate_s} />
      <mesh geometry={nodes.Mesh160_14.geometry} material={materials.EV6_Lamp_RED_s} />
      <mesh geometry={nodes.Mesh160_15.geometry} material={materials.EV6_Glass_B_s} />
      <mesh geometry={nodes.Mesh160_16.geometry} material={materials.EV6_Lamp_SatinGlass_RED_s} />
      <mesh geometry={nodes.Mesh160_17.geometry} material={materials.EV6_Interior_s} />
    </group>
  )
}

useGLTF.preload("/models/car.glb")