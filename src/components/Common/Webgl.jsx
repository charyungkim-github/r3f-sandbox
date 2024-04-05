import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { ACESFilmicToneMapping } from 'three'

import Scene from './Scene'

export default function Webgl({ page }) {
  return (
    <div className='glContainer'>
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true, toneMappingExposure: 1.0, toneMapping: ACESFilmicToneMapping }} shadows>
        <Suspense fallback={null}>
          <Scene page={page} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}