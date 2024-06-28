import { Environment, Lightformer } from "@react-three/drei"

export default function Lights() {
  return (
    <>
      <Environment background blur={1}>
        <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
        <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
        <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
        <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
        <Lightformer form="ring" color="red" intensity={1} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
        <Lightformer form="ring" color="#360b80" intensity={1} scale={10} position={[15, 4, 18]} target={[0, 0, 0]} />
      </Environment>
      <directionalLight castShadow intensity={1} position={[10, 20, 30]} color={"#fff"} />
      <ambientLight intensity={3} />
      <spotLight position={[0, 5, 0]} angle={1} penumbra={1.5} decay={0.1} intensity={3} />
    </>
  )
}
