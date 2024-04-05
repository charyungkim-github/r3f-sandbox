import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { Perf } from 'r3f-perf'

import Cube from './Cube'
import Floor from './Floor'

export default function Scene() {

  const cameraRef = useRef()
  useEffect(()=> {
    const onKeyDown = (e) => (e.key == "t") && console.log(cameraRef.current.position)
    document.addEventListener('keydown', onKeyDown)
    return() => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <Cube />
      <Floor />
      <directionalLight castShadow intensity={1} position={[-10, 20, 5]} color={'#ffffff'}/>
      <ambientLight intensity={1} color={"#e0b270"} />
      <PerspectiveCamera ref={cameraRef} position={[-3, 15, 10.5]} makeDefault />
      <OrbitControls />
      <color attach='background' args={['#ffffff']} />
      <Perf />
    </>
  )
}