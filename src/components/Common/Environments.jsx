import useSplattingStore from "../SplattingMaterial/stores/useSplattingStore"
import useNavigationStore from "../Navigation/stores/useNavigationStore"
import useVideoStore from "../Video/stores/useVideoStore"
import useTestStore from "../Test/stores/useTestStore"

export default function Environments({ page }) {

  const splattingEnv = useSplattingStore( state => state.environments )
  const navigationEnv = useNavigationStore( state => state.environments )
  const videonEnv = useVideoStore( state => state.environments )
  const testEnv = useTestStore( state => state.environments )

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
    case 'test':
      environments = testEnv
      break
    default:
      break
  }

  return(
    <>
      <directionalLight castShadow intensity={1} position={environments.dirPosition} color={'#ffffff'}/>
      <ambientLight intensity={1} color={environments.ambColor} />
      <color attach="background" args={[environments.bgColor]} />
    </>
  )
}