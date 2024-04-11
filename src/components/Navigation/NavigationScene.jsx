import { useState } from "react"
import { Vector3 } from "three"

import Player from "./Player"
import Floor from "./Floor"
import PathController from "./PathController"
import NavigationInspector from "./NavigationInspector"

// TODO :: add, remove pivot

export default function NavigationScene() {

  const points = [
    new Vector3(0, 0, 0),
    new Vector3(-5, 0, 5),
    new Vector3(-10, 0, 10),
    new Vector3(10, 0, 10),
    new Vector3(5, 0, 5),
  ]

  const [path, setPath] = useState()
  const onUpdatePath = (_path) => setPath(_path)

  return (
    <>
      <Player path={path} position={[0, 0, 0]} scale={10} />
      <Floor position={[0, -0.1, 0]} scale={[30, 0.1, 30]} />
      <PathController initPoints={points} updatePath={onUpdatePath} />
      <NavigationInspector />
    </>
  )
}