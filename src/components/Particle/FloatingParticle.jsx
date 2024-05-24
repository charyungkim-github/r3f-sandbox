import { useEffect, useRef, useState } from "react"
import { createPortal, useFrame } from "@react-three/fiber"
import { useFBO } from "@react-three/drei";
import { AdditiveBlending, Float32BufferAttribute, FloatType, NearestFilter, RGBAFormat, Scene, OrthographicCamera, DataTexture, MathUtils } from "three"
import { useControls } from "leva"

export default function FloatingParticle() {

  const options = useControls({
    count: 64,
    size: 10,
    color: '#a0a0a0',
    frequency: 0.25
  })

  const renderTarget = useFBO(options.count, options.count, {
    minFilter: NearestFilter,
    magFilter: NearestFilter,
    format: RGBAFormat,
    stencilBuffer: false,
    type: FloatType,
  })

  return(
    <>
      <Portal options={options} renderTarget={renderTarget}/>
      <Points options={options} renderTarget={renderTarget}/>
    </>
  )
}

const Portal = ({ options, renderTarget }) => {

  const ref = useRef()
  const materialRef = useRef()

  const [texture, setTexture] = useState(null)

  const scene = new Scene()
  const camera = new OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1)

  const config = {
    uFrequency: options.frequency,
    uTime: 0,
  }
  useEffect( () => {
    const dataTexture =  new DataTexture(
      getRandomData(options.count, options.count),
      options.count,
      options.count,
      RGBAFormat,
      FloatType
    )
    dataTexture.needsUpdate = true
    setTexture(dataTexture)
  }, [options.count])

  useEffect(() => {
    const positions = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0])
    const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0])
    ref.current.geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
    ref.current.geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2))
  }, [texture])

  useFrame(({ gl, clock }) => {

    gl.setRenderTarget(renderTarget)
    gl.clear()
    gl.render(scene, camera)
    gl.setRenderTarget(null)

    ref.current.material.uniforms.uTime.value = clock.elapsedTime
  })

  return(
    <>
    {createPortal(
        <mesh ref={ref}>
          <bufferGeometry attach='geometry' />
          <simulationMaterial ref={materialRef} positions={texture} {...config}  />
        </mesh>,
        scene
      )}
    </>
  )
}

const Points = ({ options, renderTarget }) => {

  const ref = useRef()

  const config = {
    uPositions: null,
    uSize: options.size,
    uColor: options.color,
  }

  useEffect(() => {
    ref.current.geometry.setAttribute('position', getPointsPositions(options.count))
  }, [options.count])

  useFrame(() => {
    ref.current.material.uniforms.uPositions.value = renderTarget.texture
  })

  return (
    <>
    <points ref={ref}>
      <bufferGeometry attach='geometry' />
      <floatingParticleMaterial blending={AdditiveBlending} depthWrite={false} {...config} />
    </points>
    </>
  )
}

const getPointsPositions = (count) => {
  const totalCount = count * count
  const positions = new Float32Array(totalCount * 3)

  for (let i = 0; i < totalCount; i++) {
    positions[i*3 + 0] = (i % count) / count
    positions[i*3 + 1] = i / count / count
  }

  return new Float32BufferAttribute(positions, 3)
}

const getRandomData = (width, height) => {
  // we need to create a vec4 since we're passing the positions to the fragment shader
  // data textures need to have 4 components, R, G, B, and A
  const length = width * height * 4
  const data = new Float32Array(length)

  for (let i = 0; i < length; i++) {
    const stride = i * 4

    const distance = Math.sqrt(Math.random()) * 2.0
    const theta = MathUtils.randFloatSpread(360)
    const phi = MathUtils.randFloatSpread(360)

    data[stride] =  distance * Math.sin(theta) * Math.cos(phi)
    data[stride + 1] =  distance * Math.sin(theta) * Math.sin(phi)
    data[stride + 2] =  distance * Math.cos(theta)
    data[stride + 3] =  1.0 // this value will not have any impact
  }

  return data
}