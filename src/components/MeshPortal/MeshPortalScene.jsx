import { useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useGLTF, MeshPortalMaterial, Environment, OrbitControls } from "@react-three/drei"
import { MathUtils } from "three"

import MeshPortalInspector from "./MeshPortalInspector"
import useMeshPortalStore from "./stores/useMeshPortalStore"

export default function MeshPortalScene() {

  return (
    <>
      <mesh scale={1.5}>
        <boxGeometry args={[2, 2, 2]} />
        <Side rotation={[0, 0, 0]} bg="orange" index={0}>
          <torusGeometry args={[0.65, 0.3, 64]} />
        </Side>
        <Side rotation={[0, Math.PI, 0]} bg="lightblue" index={1}>
          <torusKnotGeometry args={[0.55, 0.2, 128, 32]} />
        </Side>
        <Side rotation={[0, Math.PI / 2, Math.PI / 2]} bg="lightgreen" index={2}>
          <boxGeometry args={[1.15, 1.15, 1.15]} />
        </Side>
        <Side rotation={[0, Math.PI / 2, -Math.PI / 2]} bg="aquamarine" index={3}>
          <octahedronGeometry />
        </Side>
        <Side rotation={[0, -Math.PI / 2, 0]} bg="indianred" index={4}>
          <icosahedronGeometry />
        </Side>
        <Side rotation={[0, Math.PI / 2, 0]} bg="hotpink" index={5}>
          <dodecahedronGeometry />
        </Side>
      </mesh>

      <Camera enableParallax={false} enableOrbit={true} />
      <MeshPortalInspector />
    </>
  )
}

function Camera({ enableParallax, enableOrbit }) {
  const cameraPosition  = useMeshPortalStore( state => state.camera.position )
  const parallax  = useMeshPortalStore( state => state.parallax )

  const { camera }  = useThree()

  useEffect(()=>{
    camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2])
  }, [])

  useEffect(()=> {
    const onKeyDown = (e) => (e.key == "t") && console.log(camera.position)
    document.addEventListener('keydown', onKeyDown)
    return() => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useFrame((state) => {
    if(!enableParallax) return
    const { x, y } = state.pointer
    camera.lookAt(0, 0, 0)
    camera.position.x = MathUtils.lerp(camera.position.x, x * parallax.amount, parallax.lerp)
    camera.position.y = MathUtils.lerp(camera.position.y, y * parallax.amount, parallax.lerp)
  })

  return(
    <OrbitControls enabled={enableOrbit} />
  )
}

function Side({ rotation, bg, children, index }) {
  return (
    <MeshPortalMaterial worldUnits={false} attach={`material-${index}`}>
      <ambientLight intensity={3} />
      <Environment preset="city" />
      <Model rotation={rotation} color={bg} />
      <Shape scale={0.8} color={bg}>
        {children}
      </Shape>
    </MeshPortalMaterial>
  )
}

function Shape({children, color, ...props}) {

  const mesh = useRef()

  useFrame((state, delta) => {
    mesh.current.rotation.x = mesh.current.rotation.y += delta
  })

  return(
    <mesh ref={mesh} {...props}>
      {children}
      <meshPhysicalMaterial color={color} />
    </mesh>
  )
}

function Model(props) {
  const { nodes } = useGLTF("/models/aobox.glb")
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry}>
        <meshStandardMaterial aoMapIntensity={1} aoMap={nodes.Cube.material.aoMap} color={props.color} />
      </mesh>
    </group>
  )
}

useGLTF.preload("/models/aobox.glb")