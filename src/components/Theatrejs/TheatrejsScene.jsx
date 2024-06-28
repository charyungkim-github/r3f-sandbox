import { useEffect } from "react"
import { editable as e, SheetProvider } from "@theatre/r3f"
import { PerspectiveCamera } from '@theatre/r3f'

import { useRegisterTheatrejs, playAnimation } from "./useRegisterTheatrejs"
import projectState from './Project.theatre-project-state.json'

export default function TheatrejsScene() {

  // register threatrejs
  const { sheet, length } = useRegisterTheatrejs('Project', 'Sheet_01', projectState)

  useEffect(() => {
    const onKeyDown = (e) => e.key == 'p' && playAnimation(sheet, 1, [0, length])
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <SheetProvider sheet={sheet}>
        <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 10]} />
        <e.mesh theatreKey="Cube">
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial />
        </e.mesh>
        <directionalLight castShadow intensity={1} position={[10, 20, 30]} color={"#fff"} />
        <ambientLight intensity={1} color={"#fff"} />
      </SheetProvider>
    </>
  )
}

// https://www.theatrejs.com/docs/latest/getting-started/with-react-three-fiber