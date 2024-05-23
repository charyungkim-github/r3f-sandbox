import { Environment, KeyboardControls, OrbitControls, PerspectiveCamera, useGLTF, useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import MorphingParticle from "./MorphingParticle"

export default function ParticleScene() {
  const keymaps = [
    { name: 'logCamera', keys: ['KeyT'] },
    { name: 'logPlayer', keys: ['KeyY'] },
  ]

  return (
    <KeyboardControls map={keymaps}>

      <MorphingParticle />
      <Camera />
      <Environments />

    </KeyboardControls>
  )
}

function Camera() {

  const cameraRef = useRef()
  const [_, get] = useKeyboardControls()

  useFrame(()=> {
    if(get().logCamera) console.log(cameraRef.current.position)
  }, [])

  return(
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 25]}/>
      <OrbitControls />
      <color args={['#333333']} attach='background'/>
    </>
  )
}

function Environments() {
  return(
    <>
      <Environment preset={'studio'} background={false} blur={10}/>
      <ambientLight intensity={2} />
      <directionalLight position={[0,20,30]} />
    </>
  )
}