import { Perf } from 'r3f-perf'

import SplattingScene from '../SplattingMaterial/SplattingScene'
import NavigationScene from '../Navigation/NavigationScene'
import VideoScene from '../Video/VideoScene'
import MeshPortalScene from '../MeshPortal/MeshPortalScene'
import WallClippingScene from '../WallClipping/WallClippingScene'
import FpsScene from '../Fps/FpsScene'
import ParticleScene from '../Particle/ParticleScene'

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
      { page == "video" && <VideoScene /> }
      { page == "meshportal" && <MeshPortalScene /> }
      { page == "wallclipping" && <WallClippingScene /> }
      { page == "fps" && <FpsScene /> }
      { page == "particle" && <ParticleScene /> }
    </>
  )
}