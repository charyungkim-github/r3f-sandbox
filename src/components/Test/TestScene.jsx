import { useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useGLTF, MeshPortalMaterial, Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei"
import { MathUtils } from "three"

import TestInspector from "./TestInspector"
import useTestStore from "./stores/useTestStore"

export default function TestScene() {

  return (
    <>
      <Frame scale={[3, 3, 3]} position-z={-1}>
        <ambientLight intensity={3}/>
        <Environment preset="city"/>
        <Model scale={1.5} rotation-y={-Math.PI/2} position-z={-1} color='orange' />
        <DodecahedronGeometry position-z={-1} color='orange' />
      </Frame>
      <Camera enableParallax={true} enableOrbit={false} />
      <TestInspector />
    </>
  )
}

function Frame({children, ...props}) {
  return(
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <MeshPortalMaterial worldUnits={true}>
        {children}
      </MeshPortalMaterial>
    </mesh>
  )
}

function Camera({ enableParallax, enableOrbit }) {
  const parallax  = useTestStore( state => state.parallax )
  const { camera }  = useThree()

  useEffect(()=>{
    camera.position.z = 7
  }, [])

  useFrame((state) => {
    if(!enableParallax) return
    const { x, y } = state.pointer
    camera.lookAt(0, 0, 0)
    camera.position.x = MathUtils.lerp(camera.position.x, x * parallax.amount, parallax.lerp)
    camera.position.y = MathUtils.lerp(camera.position.y, y * parallax.amount, parallax.lerp)
  })

  return(
    <>
      { enableOrbit && <OrbitControls /> }
    </>
  )
}

function DodecahedronGeometry(props) {
  return(
    <mesh {...props}>
      <dodecahedronGeometry />
      <meshPhysicalMaterial color={props.color}/>
    </mesh>
  )
}

function Model(props) {
  const { nodes, materials } = useGLTF("/models/aobox.glb")
  useEffect(()=>{
    materials.Material.color.set(props.color)
  }, [])
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={materials.Material} />
    </group>
  )
}

useGLTF.preload("/models/aobox.glb")
