import { Perf } from 'r3f-perf'

import SplattingScene from '../SplattingMaterial/SplattingScene'
import PathScene from '../PathFinding/PathScene'

export default function Scene({ page }) {

  return (
    <>
      <Perf />
      { page == "splatting" && <SplattingScene /> }
      { page == "pathfinding" && <PathScene /> }
    </>
  )
}