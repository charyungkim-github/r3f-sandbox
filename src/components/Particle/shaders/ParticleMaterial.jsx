import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Color, Vector2 } from 'three'

import vertexShader from './vertexShader.glsl'
import fragmentShader from './fragmentShader.glsl'

export const ParticleMaterial = shaderMaterial(
  {
    uSize: 0.4,
    uResolution: new Vector2(500, 500),
    uProgress: 1,
    uColorA: new Color('#ff7300'),
    uColorB: new Color('#0091ff')
  },
  vertexShader,
  fragmentShader
)
extend({ ParticleMaterial })