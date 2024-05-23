import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Color, Vector2 } from 'three'

import morphingVertex from './morphing/vertex.glsl'
import morphingFragment from './morphing/fragment.glsl'
import floatingVertex from './floating/vertex.glsl'
import floatingFragment from './floating/fragment.glsl'
import simulationVertex from './simulation/vertex.glsl'
import simulationFragment from './simulation/fragment.glsl'

export const MorphingParticleMaterial = shaderMaterial(
  {
    uSize: 0.4,
    uResolution: new Vector2(500, 500),
    uProgress: 1,
    uColorA: new Color('#ff7300'),
    uColorB: new Color('#0091ff')
  },
  morphingVertex,
  morphingFragment
)
extend({ MorphingParticleMaterial })

export const FloatingParticleMaterial = shaderMaterial(
  {
    uPositions: null,
    uSize: 3,
    uColor: new Color('#ffffff'),
  },
  floatingVertex,
  floatingFragment
)
extend({ FloatingParticleMaterial })

export const SimulationMaterial = shaderMaterial(
  {
    positions: null,
    uFrequency: 0.25,
    uTime: 0,
  },
  simulationVertex,
  simulationFragment
)
extend({ SimulationMaterial })