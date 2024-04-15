import { Sky } from "@react-three/drei"

import useSplattingStore from "../SplattingMaterial/stores/useSplattingStore"
import useNavigationStore from "../Navigation/stores/useNavigationStore"
import useVideoStore from "../Video/stores/useVideoStore"
import useMeshPortalStore from "../MeshPortal/stores/useMeshPortalStore"
import useWallClippingStore from "../WallClipping/stores/useWallClippingStore"

export default function Environments({ page }) {

  const splattingEnv = useSplattingStore( state => state.environments )
  const navigationEnv = useNavigationStore( state => state.environments )
  const videonEnv = useVideoStore( state => state.environments )
  const meshPortalEnv = useMeshPortalStore( state => state.environments )
  const wallClippinglEnv = useWallClippingStore( state => state.environments )

  let environments
  switch (page) {
    case 'splatting':
      environments = splattingEnv
      break
    case 'navigation':
      environments = navigationEnv
      break
    case 'video':
      environments = videonEnv
      break
    case 'meshportal':
      environments = meshPortalEnv
      break
    case 'wallclipping':
      environments = wallClippinglEnv
      break
    default:
      break
  }

  return(
    <>
      <directionalLight castShadow intensity={1} position={environments.dirPosition} color={'#ffffff'}/>
      <ambientLight intensity={environments.ambIntensity ? environments.ambIntensity : 1} color={environments.ambColor} />
      { environments.bgColor != 'sky' && <color attach="background" args={[environments.bgColor]} />}
      { environments.bgColor == 'sky' && <Sky />}
    </>
  )
}