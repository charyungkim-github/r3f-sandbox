import { useEffect, useState } from "react"
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"

import MorphingParticle from "./MorphingParticle"
import FloatingParticle from "./FloatingParticle"
import CurlNoiseParticle from "./CurlNoiseParticle"

import './shaders/ParticleMaterials'

export default function ParticleScene() {
  const [index, setIndex] = useState(1)

  useEffect(()=>{
    const onKeyDown = (e) => {
      if(e.key == '1') setIndex(1)
      if(e.key == '2') setIndex(2)
      if(e.key == '3') setIndex(3)
    }
    document.addEventListener('keydown', onKeyDown)
    return()=>document.removeEventListener('keydown', onKeyDown)
  }, [])
  return (
    <>
      { index == 1 && <FloatingParticle /> }
      { index == 2 && <MorphingParticle /> }
      { index == 3 && <CurlNoiseParticle /> }
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