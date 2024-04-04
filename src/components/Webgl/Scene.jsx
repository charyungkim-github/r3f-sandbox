import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { Perf } from 'r3f-perf'
import Floor from './Floor/Floor'

export default function Scene() {

  const cameraRef = useRef()
  useEffect(()=> {
    const onKeyDown = (e) => (e.key == "t") && console.log(cameraRef.current.position)
    document.addEventListener('keydown', onKeyDown)
    return() => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <Floor />
      <Environment preset={'sunset'} />
      <PerspectiveCamera ref={cameraRef} position={[0, 0, 10]} makeDefault />
      <OrbitControls />
      <color attach='background' args={['#ffffff']} />
      <Perf />
    </>
  )
}