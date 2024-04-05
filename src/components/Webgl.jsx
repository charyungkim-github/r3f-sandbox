import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

import Scene from './Webgl/Scene'

export default function Webgl() {
  return (
    <div className='glContainer'>
      <Canvas gl={{ alpha: false }} shadows>
        <Suspense>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}