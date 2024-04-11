import { useState } from "react"
import { Vector3 } from "three"

import Player from "./Player"
import Floor from "./Floor"
import PathController from "./PathController"
import NavigationInspector from "./NavigationInspector"

// TODO :: remove pivot
// TODO :: add pivot

export default function NavigationScene() {

  const points = [
    new Vector3(0.93, 0, -6.9),
    new Vector3(-3.93, 0, 0.96),
    new Vector3(-9.89, 0, 7.14),
    new Vector3(3.75, 0, 7.04),
    new Vector3(10.4, 0, -3.4),
  ]

  const [path, setPath] = useState()
  const onUpdatePath = (_path) => setPath(_path)

  return (
    <>
      <Player path={path} scale={10} />
      <Floor position={[0, -0.1, 0]} scale={[30, 0.1, 30]} />
      <PathController initPoints={points} updatePath={onUpdatePath} />
      <NavigationInspector />
    </>
  )
}