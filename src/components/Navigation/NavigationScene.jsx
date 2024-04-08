import { useEffect, useRef, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { CatmullRomCurve3, Vector3 } from "three";

import NavigationInspector from "./NavigationInspector";

// TODO :: add custom path, pivot controls

export default function NavigationScene() {

  const points = [
    new Vector3(-10, 0, 10),
    new Vector3(-5, 0, 5),
    new Vector3(0, 0, 0),
    new Vector3(5, 0, 5),
    new Vector3(10, 0, 10),
  ]

  const geometry = useRef()
  const target = useRef()

  const path = new CatmullRomCurve3(points, true)

  useEffect(()=>{
    geometry.current.setFromPoints(path.getPoints(50))
  }, [])

  useFrame((state)=>{
    const duration = 20
    const t = (state.clock.elapsedTime % duration) / duration

    // position
    const position = path.getPointAt(t)
    target.current.position.copy(position)

    // rotation
    const rotation = path.getTangentAt(t).normalize()
    target.current.lookAt(position.clone().add(rotation))
  })

  return (
    <>
      <NavigationInspector />

      <line>
        <bufferGeometry ref={geometry} />
        <meshBasicMaterial color={"#b7b374"} />
      </line>

      <PlayerModel ref={target} />

      <mesh scale={[30, 0.1, 30]} position={[0, -0.1, 0]}>
        <boxGeometry args={[1, 1]} />
        <meshBasicMaterial color={'#898989'} />
      </mesh>
    </>
  )
}

const PlayerModel = forwardRef ((props, ref) => {

  const { nodes, materials, animations } = useGLTF('/models/player.glb')
  const { actions } = useAnimations(animations, ref)

  useEffect(()=>{ actions["Main_Run"].play() }, [])

  return (
    <group ref={ref} {...props} dispose={null} scale={10}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
        </group>
        <skinnedMesh name="Main_Body" geometry={nodes.Main_Body.geometry} material={materials.Main_Body_s} skeleton={nodes.Main_Body.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <skinnedMesh name="Main_Outfit" geometry={nodes.Main_Outfit.geometry} material={materials.Main_Outfit_s} skeleton={nodes.Main_Outfit.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </group>
    </group>
  )
})

useGLTF.preload('/models/player.glb')
