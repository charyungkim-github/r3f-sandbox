import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"

import MorphingParticle from "./MorphingParticle"
import FloatingParticle from "./FloatingParticle"

import './shaders/ParticleMaterials'

export default function ParticleScene() {

  return (
    <>
      <FloatingParticle />
      <MorphingParticle />
      <Camera />
      <Environments />
    </>
  )
}

function Camera() {
  return(
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]}/>
      <OrbitControls />
    </>
  )
}

function Environments() {
  return(
    <>
      <Environment preset={'studio'} background={false} blur={10}/>
      <ambientLight intensity={2} />
      <directionalLight position={[0,20,30]} />
      <color args={['#333333']} attach='background'/>
    </>
  )
}