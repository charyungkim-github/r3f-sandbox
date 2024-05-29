import { Environment, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei"

import PathFindingController from "./PathFindingController"
import MapModel from "./MapModel"

export default function PathFindingScene() {
  return(
    <>
      <PathFindingController />
      <MapModel />
      <Camera />
      <Environments />
    </>
  )
}

function Camera() {
  return(
    <>
      <PerspectiveCamera makeDefault position={[-10, 14, 10]}/>
      <OrbitControls />
    </>
  )
}

function Environments() {
  return(
    <>
      <Environment preset={'city'} background={true} blur={10}/>
      <ambientLight intensity={1} />
      <directionalLight intensity={1} castShadow position={[0,20,30]} />
      <color args={['#333333']} attach='background'/>
    </>
  )
}
