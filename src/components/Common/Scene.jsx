import { Perf } from 'r3f-perf'

import SplattingScene from '../SplattingMaterial/SplattingScene'
import NavigationScene from '../Navigation/NavigationScene'
import Camera from './Camera'
import Environments from './Environments'

export default function Scene({ page }) {

  return (
    <>
      <Perf position={'top-left'} />
      <Camera page={page} />
      <Environments page={page} />
      { page == "splatting" && <SplattingScene /> }
      { page == "navigation" && <NavigationScene /> }
    </>
  )
}