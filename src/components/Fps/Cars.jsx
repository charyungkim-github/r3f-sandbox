import { useGLTF } from "@react-three/drei"

export default function Cars() {
  return (
    <>
      <Car position={[6, 0, -2.8]} />
      <Car position={[6, 0, 2.9]} />
      <Car position={[0.6, 0, -5.6]} rotation={[0, 0.95, 0]} />
      <Car position={[0.75, 0, 5.6]} rotation={[0, -0.95, 0]} />
      <Car position={[-6, 0, -2.8]} />
      <Car position={[-6, 0, 2.9]} />
    </>
  )
}

function Car(props) {

  const { nodes, materials, scene } = useGLTF("/models/car_01.glb")

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="K_EV_EXT" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            name="Gaslift_BodyPin_LT"
            position={[149.341, 58.351, -137.29]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={-1}
          >
            <mesh
              name="K_EV_ORM_Gaslift_BodyPin_LT"
              geometry={nodes.K_EV_ORM_Gaslift_BodyPin_LT.geometry}
              material={materials.K_EV_ORM_s}
              position={[19.33, -0.179, 11.213]}
              rotation={[0.023, 1.044, -0.02]}
              scale={[1.803, 1.803, 19.185]}
            />
          </group>
          <group
            name="Gaslift_BodyPin_RT"
            position={[149.341, -58.351, -137.29]}
          >
            <mesh
              name="K_EV_ORM_Gaslift_BodyPin_RT"
              geometry={nodes.K_EV_ORM_Gaslift_BodyPin_RT.geometry}
              material={materials.K_EV_ORM_s}
              position={[19.33, -0.179, 11.213]}
              rotation={[0.023, 1.044, -0.02]}
              scale={[1.803, 1.803, 19.185]}
            />
          </group>
          <group name="TailGate_Ani" position={[145.072, -42.368, -150.11]}>
            <group
              name="Gaslift_TailGatePin_LT"
              position={[39.927, 101.142, -36.825]}
              rotation={[Math.PI, -1.436, Math.PI]}
              scale={-1}
            >
              <mesh
                name="K_EV_ORM_Gaslift_TailGatePin_LT"
                geometry={nodes.K_EV_ORM_Gaslift_TailGatePin_LT.geometry}
                material={materials.K_EV_ORM_s}
                position={[-13.882, 0.186, -8.065]}
                rotation={[0.023, 1.044, -0.02]}
                scale={[1.4, 1.4, 16.415]}
              />
            </group>
            <group
              name="Gaslift_TailGatePin_RT"
              position={[41.843, -16.405, 34.632]}
            >
              <mesh
                name="K_EV_ORM_Gaslift_TailGatePin_RT"
                geometry={nodes.K_EV_ORM_Gaslift_TailGatePin_RT.geometry}
                material={materials.K_EV_ORM_s}
                position={[-13.882, 0.186, -8.065]}
                rotation={[0.023, 1.044, -0.02]}
                scale={[1.4, 1.4, 16.415]}
              />
            </group>
            <mesh
              name="K_EV_INT_MainColor_Gray_TailGate"
              geometry={nodes.K_EV_INT_MainColor_Gray_TailGate.geometry}
              material={materials.K_EV_INT_MainColor_Gray_s}
              position={[-145.072, 42.368, 150.11]}
            />
            <mesh
              name="K_EV_Lamp_Clear_TailGate"
              geometry={nodes.K_EV_Lamp_Clear_TailGate.geometry}
              material={materials.K_EV_Lamp_Clear_s}
            />
            <mesh
              name="K_EV_Lamp_SatinGlass_RED_TailGate"
              geometry={nodes.K_EV_Lamp_SatinGlass_RED_TailGate.geometry}
              material={materials.K_EV_Lamp_Brake_s}
            />
            <mesh
              name="K_EV_NumberPlateLight_TailGate"
              geometry={nodes.K_EV_NumberPlateLight_TailGate.geometry}
              material={materials.K_EV_NumberPlateLight_s}
              position={[-145.072, 42.368, 150.264]}
            />
            <mesh
              name="K_EV_ORM_TailGate"
              geometry={nodes.K_EV_ORM_TailGate.geometry}
              material={materials.K_EV_ORM_s}
              position={[-145.072, 42.368, 150.11]}
            />
            <mesh
              name="K_EV_PaintColor_TailGate"
              geometry={nodes.K_EV_PaintColor_TailGate.geometry}
              material={materials.K_EV_PaintColor_s}
              position={[-145.072, 42.368, 150.11]}
            />
            <mesh
              name="K_EV_Tex_TailGate"
              geometry={nodes.K_EV_Tex_TailGate.geometry}
              material={materials.K_EV_Tex_s}
            />
            <mesh
              name="K_EV_WindowGlass_TailGate"
              geometry={nodes.K_EV_WindowGlass_TailGate.geometry}
              material={materials.K_EV_WindowGlass_s}
            />
          </group>
        </group>
        <mesh
          name="A_Light_Mesh"
          geometry={nodes.A_Light_Mesh.geometry}
          material={materials.A_Light_Mesh_s}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <group
          name="K_EV_ChargingCover_grp"
          position={[-2.139, 0.787, 0.173]}
          rotation={[Math.PI / 2, -0.174, 0]}
          scale={0.01}
        >
          <mesh
            name="K_EV_ChargingCover_ANI"
            geometry={nodes.K_EV_ChargingCover_ANI.geometry}
            material={materials.K_EV_ORM_s}
          >
            <mesh
              name="K_EV_ORM_ChargingCover_IS"
              geometry={nodes.K_EV_ORM_ChargingCover_IS.geometry}
              material={materials.K_EV_ORM_s}
              position={[224.26, -17.3, 40.634]}
              rotation={[0, 0.174, 0]}
            />
            <mesh
              name="K_EV_PaintColor_ChargingCover_OS"
              geometry={nodes.K_EV_PaintColor_ChargingCover_OS.geometry}
              material={materials.K_EV_PaintColor_s}
              position={[224.26, -17.3, 40.634]}
              rotation={[0, 0.174, 0]}
            />
          </mesh>
        </group>
        <group
          name="K_EV_DoorFL_ANI_grp"
          position={[-0.814, 0.78, 0.856]}
          rotation={[1.528, -0.009, 3.141]}
          scale={[-0.01, 0.01, 0.01]}
        >
          <mesh
            name="K_EV_DoorFL_ANI"
            geometry={nodes.K_EV_DoorFL_ANI.geometry}
            material={materials.K_EV_PaintColor_s}
          >
            <mesh
              name="A_Light_Mesh_FL"
              geometry={nodes.A_Light_Mesh_FL.geometry}
              material={materials.A_Light_Mesh_s}
              position={[-45.782, 111.896, 73.519]}
              rotation={[-0.026, -0.035, 1.134]}
            />
            <group name="K_EV_DoorFL">
              <mesh
                name="K_EV_INT_Leather_B_DoorFL"
                geometry={nodes.K_EV_INT_Leather_B_DoorFL.geometry}
                material={materials.K_EV_INT_Leather_B_s}
                position={[82.064, 88.781, 73.519]}
                rotation={[3.099, -0.009, 3.142]}
                scale={-1}
              />
              <mesh
                name="K_EV_INT_MainColor_White_DoorFL"
                geometry={nodes.K_EV_INT_MainColor_White_DoorFL.geometry}
                material={materials.K_EV_INT_MainColor_White_s}
              />
              <mesh
                name="K_EV_INT_Speaker_DoorFL"
                geometry={nodes.K_EV_INT_Speaker_DoorFL.geometry}
                material={materials.K_EV_INT_Speaker_s}
                position={[82.064, 88.781, 73.519]}
                rotation={[3.099, -0.009, 3.142]}
                scale={-1}
              />
              <mesh
                name="K_EV_Lamp_Clear_DoorFL"
                geometry={nodes.K_EV_Lamp_Clear_DoorFL.geometry}
                material={materials.K_EV_Lamp_Clear_s}
              />
              <mesh
                name="K_EV_ORM_DoorFL"
                geometry={nodes.K_EV_ORM_DoorFL.geometry}
                material={materials.K_EV_ORM_s}
              />
              <mesh
                name="K_EV_PaintColor_DoorFL"
                geometry={nodes.K_EV_PaintColor_DoorFL.geometry}
                material={materials.K_EV_PaintColor_s}
                position={[82.064, 88.781, 73.519]}
                rotation={[3.099, -0.009, 3.142]}
                scale={-1}
              />
              <mesh
                name="K_EV_Tex_DoorFL"
                geometry={nodes.K_EV_Tex_DoorFL.geometry}
                material={materials.K_EV_Tex_s}
              />
              <mesh
                name="K_EV_WindowGlass_DoorFL"
                geometry={nodes.K_EV_WindowGlass_DoorFL.geometry}
                material={materials.K_EV_WindowGlass_s}
                position={[82.064, 88.782, 73.52]}
                rotation={[3.099, -0.009, 3.142]}
                scale={-1}
              />
            </group>
          </mesh>
        </group>
        <group
          name="K_EV_DoorFR_ANI_grp"
          position={[-0.814, 0.78, -0.856]}
          rotation={[1.613, -0.009, 0]}
          scale={0.01}
        >
          <mesh
            name="K_EV_DoorFR_ANI"
            geometry={nodes.K_EV_DoorFR_ANI.geometry}
            material={materials.K_EV_PaintColor_s}
          >
            <mesh
              name="A_Light_Mesh_FR"
              geometry={nodes.A_Light_Mesh_FR.geometry}
              material={materials.A_Light_Mesh_s}
              position={[-45.782, 111.896, 73.519]}
              rotation={[-0.026, -0.035, 1.134]}
            />
            <group name="K_EV_DoorFR">
              <mesh
                name="K_EV_INT_Leather_B_DoorFR"
                geometry={nodes.K_EV_INT_Leather_B_DoorFR.geometry}
                material={materials.K_EV_INT_Leather_B_s}
                position={[82.064, 88.781, 73.519]}
                rotation={[-0.042, 0.009, 0]}
              />
              <mesh
                name="K_EV_INT_MainColor_White_DoorFR"
                geometry={nodes.K_EV_INT_MainColor_White_DoorFR.geometry}
                material={materials.K_EV_INT_MainColor_White_s}
              />
              <mesh
                name="K_EV_INT_Speaker_DoorFR"
                geometry={nodes.K_EV_INT_Speaker_DoorFR.geometry}
                material={materials.K_EV_INT_Speaker_s}
                position={[82.064, 88.781, 73.519]}
                rotation={[-0.042, 0.009, 0]}
              />
              <mesh
                name="K_EV_Lamp_Clear_DoorFR"
                geometry={nodes.K_EV_Lamp_Clear_DoorFR.geometry}
                material={materials.K_EV_Lamp_Clear_s}
              />
              <mesh
                name="K_EV_ORM_DoorFR"
                geometry={nodes.K_EV_ORM_DoorFR.geometry}
                material={materials.K_EV_ORM_s}
              />
              <mesh
                name="K_EV_PaintColor_DoorFR"
                geometry={nodes.K_EV_PaintColor_DoorFR.geometry}
                material={materials.K_EV_PaintColor_s}
                position={[82.064, 88.781, 73.519]}
                rotation={[-0.042, 0.009, 0]}
              />
              <mesh
                name="K_EV_Tex_DoorFR"
                geometry={nodes.K_EV_Tex_DoorFR.geometry}
                material={materials.K_EV_Tex_s}
              />
              <mesh
                name="K_EV_WindowGlass_DoorFR"
                geometry={nodes.K_EV_WindowGlass_DoorFR.geometry}
                material={materials.K_EV_WindowGlass_s}
                position={[82.064, 88.781, 73.519]}
                rotation={[-0.042, 0.009, 0]}
              />
            </group>
          </mesh>
        </group>
        <group
          name="K_EV_DoorRL_ANI_grp"
          position={[0.266, 0.824, 0.855]}
          rotation={[1.522, -0.064, 3.141]}
          scale={[-0.01, 0.01, 0.01]}
        >
          <mesh
            name="K_EV_DoorRL_ANI"
            geometry={nodes.K_EV_DoorRL_ANI.geometry}
            material={materials.K_EV_PaintColor_s}
          >
            <group name="K_EV_DoorRL" rotation={[-0.049, 0.064, 0.003]}>
              <mesh
                name="K_EV_INT_Leather_B_DoorRL"
                geometry={nodes.K_EV_INT_Leather_B_DoorRL.geometry}
                material={materials.K_EV_INT_Leather_B_s}
                position={[-26.625, 85.517, 82.377]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={-1}
              />
              <mesh
                name="K_EV_INT_MainColor_White_DoorRL"
                geometry={nodes.K_EV_INT_MainColor_White_DoorRL.geometry}
                material={materials.K_EV_INT_MainColor_White_s}
              />
              <mesh
                name="K_EV_INT_Speaker_DoorRL"
                geometry={nodes.K_EV_INT_Speaker_DoorRL.geometry}
                material={materials.K_EV_INT_Speaker_s}
                position={[-26.625, 85.517, 82.377]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={-1}
              />
              <mesh
                name="K_EV_ORM_DoorRL"
                geometry={nodes.K_EV_ORM_DoorRL.geometry}
                material={materials.K_EV_ORM_s}
              />
              <mesh
                name="K_EV_PaintColor_DoorRL"
                geometry={nodes.K_EV_PaintColor_DoorRL.geometry}
                material={materials.K_EV_PaintColor_s}
                position={[-26.515, 85.684, 82.377]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={-1}
              />
              <mesh
                name="K_EV_WindowGlass_DoorRL"
                geometry={nodes.K_EV_WindowGlass_DoorRL.geometry}
                material={materials.K_EV_WindowGlass_s}
                position={[-26.625, 85.517, 82.377]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={-1}
              />
            </group>
          </mesh>
        </group>
        <group
          name="K_EV_DoorRR_ANI_grp"
          position={[0.266, 0.824, -0.855]}
          rotation={[1.62, -0.064, 0]}
          scale={0.01}
        >
          <mesh
            name="K_EV_DoorRR_ANI"
            geometry={nodes.K_EV_DoorRR_ANI.geometry}
            material={materials.K_EV_PaintColor_s}
          >
            <group name="K_EV_DoorRR" rotation={[-0.049, 0.064, 0.003]}>
              <mesh
                name="K_EV_INT_Leather_B_DoorRR"
                geometry={nodes.K_EV_INT_Leather_B_DoorRR.geometry}
                material={materials.K_EV_INT_Leather_B_s}
                position={[-26.625, 85.517, 82.377]}
              />
              <mesh
                name="K_EV_INT_MainColor_White_DoorRR"
                geometry={nodes.K_EV_INT_MainColor_White_DoorRR.geometry}
                material={materials.K_EV_INT_MainColor_White_s}
              />
              <mesh
                name="K_EV_INT_Speaker_DoorRR"
                geometry={nodes.K_EV_INT_Speaker_DoorRR.geometry}
                material={materials.K_EV_INT_Speaker_s}
                position={[-26.625, 85.517, 82.377]}
              />
              <mesh
                name="K_EV_ORM_DoorRR"
                geometry={nodes.K_EV_ORM_DoorRR.geometry}
                material={materials.K_EV_ORM_s}
              />
              <mesh
                name="K_EV_PaintColor_DoorRR"
                geometry={nodes.K_EV_PaintColor_DoorRR.geometry}
                material={materials.K_EV_PaintColor_s}
                position={[-26.625, 85.517, 82.377]}
              />
              <mesh
                name="K_EV_WindowGlass_DoorRR"
                geometry={nodes.K_EV_WindowGlass_DoorRR.geometry}
                material={materials.K_EV_WindowGlass_s}
                position={[-26.625, 85.517, 82.377]}
              />
            </group>
          </mesh>
        </group>
        <mesh
          name="K_EV_Lamp_Brake_Body"
          geometry={nodes.K_EV_Lamp_Brake_Body.geometry}
          material={materials.K_EV_Lamp_Brake_s}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="K_EV_Lamp_Clear_Body"
          geometry={nodes.K_EV_Lamp_Clear_Body.geometry}
          material={materials.K_EV_Lamp_Clear_s}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="K_EV_Lamp_DarkGray_Body"
          geometry={nodes.K_EV_Lamp_DarkGray_Body.geometry}
          material={materials.K_EV_Lamp_DarkGray_s}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="K_EV_Lamp_DRL_Body"
          geometry={nodes.K_EV_Lamp_DRL_Body.geometry}
          material={materials.K_EV_Lamp_DRL_s}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="K_EV_Lamp_ProjGlass_Body"
          geometry={nodes.K_EV_Lamp_ProjGlass_Body.geometry}
          material={materials.K_EV_Lamp_ProjGlass_s}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="K_EV_Lamp_Red_Body"
          geometry={nodes.K_EV_Lamp_Red_Body.geometry}
          material={materials.K_EV_Lamp_RED_s}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="K_EV_Lamp_SatinGlass_Body"
          geometry={nodes.K_EV_Lamp_SatinGlass_Body.geometry}
          material={materials.K_EV_Lamp_SatinGlass_s}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="K_EV_ORM_Body"
          geometry={nodes.K_EV_ORM_Body.geometry}
          material={materials.K_EV_ORM_s}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="K_EV_PaintColor_Body"
          geometry={nodes.K_EV_PaintColor_Body.geometry}
          material={materials.K_EV_PaintColor_s}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <group
          name="K_EV_Sunroof_ANI_grp"
          position={[-0.13, 1.566, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <group name="K_EV_Sunroof_ANI">
            <mesh
              name="K_EV_ORM_Sunroof"
              geometry={nodes.K_EV_ORM_Sunroof.geometry}
              material={materials.K_EV_ORM_s}
              position={[13.049, 0, 156.638]}
            />
            <mesh
              name="K_EV_WindowGlass_Sunroof"
              geometry={nodes.K_EV_WindowGlass_Sunroof.geometry}
              material={materials.K_EV_WindowGlass_s}
              position={[13.049, 0, 156.638]}
            />
          </group>
        </group>
        <mesh
          name="K_EV_Tex_Body"
          geometry={nodes.K_EV_Tex_Body.geometry}
          material={materials.K_EV_Tex_s}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="K_EV_Tire_OCC_WT"
          geometry={nodes.K_EV_Tire_OCC_WT.geometry}
          material={materials.K_EV_Tire_OCC_s}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="K_EV_WindowGlass_Body"
          geometry={nodes.K_EV_WindowGlass_Body.geometry}
          material={materials.K_EV_WindowGlass_s}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <mesh
          name="K_EV_INT_Tire_WT19"
          geometry={nodes.K_EV_INT_Tire_WT19.geometry}
          material={materials["K_EV_INT_Tire_WT19_s.001"]}
          position={[-1.266, 0.321, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
      </group>
    </group>
  )
}
useGLTF.preload("/models/car_01.glb")
