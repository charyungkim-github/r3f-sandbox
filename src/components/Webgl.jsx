import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Webgl/Scene'
import { Perf } from 'r3f-perf'

export default function Webgl() {
  return (
    <div className='glContainer'>
      <Canvas gl={{ alpha: false }}>
        <Suspense>
          <Perf/>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}