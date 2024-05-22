import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { AdditiveBlending, BufferAttribute, Color, Float32BufferAttribute, Vector2 } from 'three'
import { button, useControls } from 'leva'
import gsap from 'gsap'

import './shaders/ParticleMaterial'

export default function Background() {

  const options = useControls('particle', {
    colorA: '#ff7300',
    colorB: '#0091ff',
    size: 0.4,
    random: 0.5,
    progress: { value: 0, min: 0, max: 1 },
    Morph0: button((get) => { updateGeometry(0) }),
    Morph1: button((get) => { updateGeometry(1) }),
    Morph2: button((get) => { updateGeometry(2) }),
    Morph3: button((get) => { updateGeometry(3) }),
  })

  const geometryRef = useRef()
  const materialRef = useRef()
  const positions = useRef([])
  const index = useRef(0)

  const { scene } = useGLTF("/models/particle-models.glb")

  const config = {
    uSize: options.size,
    uResolution: new Vector2(500, 500),
    uProgress: options.progress,
    uColorA: new Color(options.colorA),
    uColorB: new Color(options.colorB)
  }

  useEffect(() => {

    // get particle
    const particles = getParticles(scene)

    // init geometry
    geometryRef.current.setAttribute('position', particles.positions[0])
    geometryRef.current.setAttribute('aPositionTarget', particles.positions[1])
    geometryRef.current.setAttribute('aSize', particles.sizes)

    // save on ref
    positions.current = particles.positions
  }, [])

  const updateGeometry = (targetIndex) => {

    // geometry
    geometryRef.current.attributes.position = positions.current[index.current]
    geometryRef.current.attributes.aPositionTarget = positions.current[targetIndex]

    // progress
    gsap.fromTo(
      materialRef.current.uniforms.uProgress,
      { value: 0 },
      { value: 1, duration: 3, ease: 'linear' }
    )

    // save on ref
    index.current = targetIndex
  }

  return(
    <points frustumCulled={false}>
      <bufferGeometry ref={geometryRef} attach='geometry' />
      <particleMaterial ref={materialRef} blending={AdditiveBlending} depthWrite={false} {...config} />
    </points>
  )
}

function getParticles(scene) {
  const modelPositions = scene.children.map( child => child.geometry.attributes.position )
  const maxCount = Math.max(...modelPositions.map( position => position.count ))

  // position
  const positions = []
  for(const position of modelPositions) {
    const originalArray = position.array
    const newArray = new Float32Array(maxCount * 3)

    for(let i = 0; i < maxCount; i++) {
      const i3 = i * 3
      if(i3 < originalArray.length) {
        newArray[i3 + 0] = originalArray[i3 + 0]
        newArray[i3 + 1] = originalArray[i3 + 1]
        newArray[i3 + 2] = originalArray[i3 + 2]
      }
      else {
        const randomIndex = Math.floor(position.count * Math.random()) * 3
        newArray[i3 + 0] = originalArray[randomIndex + 0]
        newArray[i3 + 1] = originalArray[randomIndex + 1]
        newArray[i3 + 2] = originalArray[randomIndex + 2]
      }
    }
    positions.push(new Float32BufferAttribute(newArray, 3))
  }

  // size
  const randomSizes = Float32Array.from({ length: maxCount }, () => Math.random())
  const sizes = new BufferAttribute(randomSizes, 1)

  return { positions, sizes }
}