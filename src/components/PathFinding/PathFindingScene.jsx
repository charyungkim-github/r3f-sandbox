import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"

import Map from "./Map"

export default function PathFindingScene() {
  return(
    <>
      <Box />
      <Map />
      <Camera />
      <Environments />
    </>
  )
}

function Box() {
  return(
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color='lightgreen' />
    </mesh>
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