import NavigationInspector from "./NavigationInspector";

export default function NavigationScene() {

  return (
    <>
      <NavigationInspector />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial />
      </mesh>
    </>
  )
}