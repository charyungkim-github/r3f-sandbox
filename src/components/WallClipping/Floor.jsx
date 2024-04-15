import { RigidBody } from "@react-three/rapier";

export default function Floor(props) {
  return(
    <RigidBody type="fixed" colliders='cuboid'>
      <mesh scale={[100, 1, 100]} position={[0, -0.5, 0]}>
        <boxGeometry args={[1, 1]} />
        <meshBasicMaterial color={'#b1b1b1'} />
      </mesh>
    </RigidBody>
  )
}
