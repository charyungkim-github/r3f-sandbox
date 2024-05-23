import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"

import MorphingParticle from "./MorphingParticle"

export default function ParticleScene() {

  return (
    <>
      <MorphingParticle />
      <Camera />
      <Environments />
    </>
  )
}

function Camera() {
  return(
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 25]}/>
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