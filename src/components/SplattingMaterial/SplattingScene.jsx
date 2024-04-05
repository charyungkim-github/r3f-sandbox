import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useEffect, useRef } from 'react'

import Cube from './Cube'
import Floor from './Floor'

export default function Scene() {

  const cameraRef = useRef()

  return (
    <>
      {/* Props */}
      <Cube />
      <Floor />

      {/* Lights */}
      <directionalLight castShadow intensity={1} position={[-10, 20, 5]} color={'#ffffff'}/>
      <ambientLight intensity={1} color={"#e0b270"} />
      <color attach={"background"} color={'#fff'} />

      {/* Camera */}
      <PerspectiveCamera ref={cameraRef} position={[-3, 15, 10.5]} makeDefault />
      <OrbitControls />

      {/* Others */}
      <KeyEvents cameraRef={cameraRef} />
    </>
  )
}

function KeyEvents(props) {

  useEffect(()=> {
    const onKeyDown = (e) => (e.key == "t") && console.log(props.cameraRef.current.position)
    document.addEventListener('keydown', onKeyDown)
    return() => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return null
}