export default function Floor(props) {
  return(
    <mesh {...props}>
      <boxGeometry args={[1, 1]} />
      <meshBasicMaterial color={'#0f544e'} />
    </mesh>
  )
}
