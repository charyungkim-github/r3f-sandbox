import { Environment, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei"

import Navmesh from "./Navmesh"
import Map from "./Map"

export default function PathFindingScene() {
  return(
    <>
      <Navmesh />
      <Map />
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
      <Environment preset={'studio'} background={false} blur={10}/>
      <ambientLight intensity={1} />
      <directionalLight intensity={10} castShadow position={[0,20,30]} />
      <color args={['#333333']} attach='background'/>
    </>
  )
}
