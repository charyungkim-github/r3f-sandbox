import { useEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { ScrollControls, useScroll } from "@react-three/drei"
import { editable as e, SheetProvider, useCurrentSheet } from "@theatre/r3f"
import { PerspectiveCamera } from "@theatre/r3f"
import { Vector3 } from "three"

import { useTheatrejsEditor, createSheet, playAnimation } from "./useRegisterTheatrejs"
import CarModel from "./CarModel"
import Lights from "./Lights"
import projectState from "./Project.theatre-project-state.json"

export default function TheatrejsSceneWrapper() {

  const enableEditor = false
  const enableKeyEvents = false

  // register threatrejs
  enableEditor && useTheatrejsEditor()

  // create sheet
  const { sheet } = createSheet("Project", "Sheet_01", projectState)

  // regiester key events
  useEffect(() => {
    const onKeyDown = (e) => enableKeyEvents && e.key == "p" && playAnimation(sheet, 1, [0, 5])
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <>
      <ScrollControls pages={5}>
        <SheetProvider sheet={sheet}>
          <TheatrejsScene />
        </SheetProvider>
      </ScrollControls>
    </>
  )
}

function TheatrejsScene() {
  const cameraRef = useRef()
  const sheet = useCurrentSheet()
  const scroll = useScroll()
  const lookAtTarget = useMemo(() => new Vector3(0, 0, 0), [])

  // scroll animation
  useFrame(() => {
    if(scroll.delta > 0) sheet.sequence.position = scroll.offset * 5
    cameraRef.current.lookAt(lookAtTarget)
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} theatreKey="Camera" makeDefault position={[0, 0, 10]} />
      <e.group theatreKey="Car">
        <CarModel />
      </e.group>
      <Lights />
    </>
  )
}
