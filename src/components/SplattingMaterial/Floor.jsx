import { useTexture } from "@react-three/drei"
import { MeshPhysicalMaterial, RepeatWrapping } from "three"
import CustomShaderMaterial from 'three-custom-shader-material'

import { vertex, fragment } from "./shaders/splattingShader"

export default function Floor() {

  const rock = useTexture("/textures/rock.jpg", (texture) => { texture.wrapS = texture.wrapT = RepeatWrapping })
  const grass = useTexture("/textures/grass.jpg", (texture) => { texture.wrapS = texture.wrapT = RepeatWrapping })
  const asphalt = useTexture("/textures/asphalt.png", (texture) => { texture.wrapS = texture.wrapT = RepeatWrapping })
  const sand = useTexture("/textures/sand.jpg", (texture) => { texture.wrapS = texture.wrapT = RepeatWrapping })
  const splatMap = useTexture("/textures/splatting.png", (texture) => { texture.wrapS = texture.wrapT = RepeatWrapping })

  const uniforms = {
    texture1: { value: rock },
    texture2: { value: grass },
    texture3: { value: asphalt },
    texture4: { value: sand },
    repeatTexture1: { value: [10, 10] },
    repeatTexture2: { value: [10, 10] },
    repeatTexture3: { value: [10, 10] },
    repeatTexture4: { value: [10, 10] },
    splatMap: { value: splatMap }
  }

  return(
    <>
      <mesh receiveShadow rotation={[-Math.PI/2, 0, 0]} >
        <planeGeometry args={[16, 8]} />
        <CustomShaderMaterial
          baseMaterial={MeshPhysicalMaterial}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
        />
      </mesh>
    </>
  )
}