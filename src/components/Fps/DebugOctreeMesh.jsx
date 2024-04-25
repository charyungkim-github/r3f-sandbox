import useFpsStore from "./stores/useFpsStore"

export default function DebugOctreeMesh({ nodes }) {
  const enableOctreeMesh = useFpsStore(state => state.debug.enableOctreeMesh)
  return (
    <>
      { enableOctreeMesh &&
        <group dispose={null}>
          <mesh castShadow receiveShadow geometry={nodes.Suzanne007.geometry} material={nodes.Suzanne007.material} position={[1.74, 1.04, 24.97]} />
        </group> }
    </>
  )
}