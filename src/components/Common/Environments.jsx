import useAppStore from "./stores/useAppStore"

export default function Environments({ page }) {

  const environments = useAppStore( state => state[page].environments )

  return(
    <>
      <directionalLight castShadow intensity={1} position={environments.dirPosition} color={'#ffffff'}/>
      <ambientLight intensity={1} color={environments.ambColor} />
      <color attach="background" args={[environments.bgColor]} />
    </>
  )
}