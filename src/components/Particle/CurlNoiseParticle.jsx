import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { AdditiveBlending, Float32BufferAttribute, MathUtils, Color } from "three"

export default function CurlNoiseParticle() {
  const count = 1000
  const radius = 5

  const pointsRef = useRef(null)

  const config = {
    uTime: 0,
    uSize: 2,
    uColor: new Color('#a1a1a1')
  }
  useFrame(({ clock }) => {
    pointsRef.current.material.uniforms.uTime.value = clock.elapsedTime
  })

  useEffect(()=>{
    pointsRef.current.geometry.setAttribute('position', getPointsPositions(count, radius))
  }, [])

  return (
    <points ref={pointsRef} position-z={3}>
      <bufferGeometry attach='geometry' />
      <curlNoiseMaterial blending={AdditiveBlending} depthWrite={false} {...config} />
    </points>
  )
}

const getPointsPositions = (count, radius) => {

  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {

    const distance = Math.sqrt(Math.random()) * radius
    const theta = MathUtils.randFloatSpread(360)
    const phi = MathUtils.randFloatSpread(360)

    const x = distance * Math.sin(theta) * Math.cos(phi)
    const y = distance * Math.sin(theta) * Math.sin(phi)
    const z = distance * Math.cos(theta)

    positions.set([x, y, z], i * 3)
  }

  return new Float32BufferAttribute(positions, 3)
}
