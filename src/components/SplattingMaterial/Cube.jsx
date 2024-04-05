export default function Cube() {

  console.log("hello");

  return(
    <>
      <mesh castShadow position={[0, 2, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial />
      </mesh>
    </>
  )
}