import Camera from "../Common/Camera"
import Environments from "../Common/Environments"
import Cube from "./Cube"
import Floor from "./Floor"
import SplattingInspector from "./SplattingInspector"

export default function SplattingScene() {

  return (
    <>
      <Cube />
      <Floor />
      <SplattingInspector />
    </>
  )
}