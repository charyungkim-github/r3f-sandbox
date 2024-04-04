import { useTexture } from "@react-three/drei"
import { RepeatWrapping } from "three"
import "./shaders/SplattingMaterial"

export default function Floor() {

  const rock = useTexture("/textures/rock.jpg", (texture) => { texture.wrapS = texture.wrapT = RepeatWrapping })
  const grass = useTexture("/textures/grass.jpg", (texture) => { texture.wrapS = texture.wrapT = RepeatWrapping })
  const asphalt = useTexture("/textures/asphalt.png", (texture) => { texture.wrapS = texture.wrapT = RepeatWrapping })
  const sand = useTexture("/textures/sand.jpg", (texture) => { texture.wrapS = texture.wrapT = RepeatWrapping })
  const splatMap = useTexture("/textures/splatting.png", (texture) => { texture.wrapS = texture.wrapT = RepeatWrapping })

  return(
    <>
      <mesh>
        <planeGeometry args={[16, 8]} />
        <splattingMaterial
          texture1={rock}
          texture2={grass}
          texture3={asphalt}
          texture4={sand}
          repeatTexture1={[10, 5]}
          repeatTexture2={[10, 5]}
          repeatTexture3={[10, 5]}
          repeatTexture4={[10, 5]}
          splatMap={splatMap}
        />
      </mesh>
    </>
  )
}