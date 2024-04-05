import { Perf } from 'r3f-perf'

import Camera from './Camera'
import Environments from './Environments'
import DebugInspector from './DebugInspector'
import SplattingScene from '../SplattingMaterial/SplattingScene'
import NavigationScene from '../Navigation/NavigationScene'

export default function Scene({ page }) {

  return (
    <>
      <Perf position={'top-left'} />
      <Camera page={page} />
      <Environments page={page} />
      <DebugInspector page={page} />
      { page == "splatting" && <SplattingScene /> }
      { page == "navigation" && <NavigationScene /> }
    </>
  )
}