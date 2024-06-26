import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { ACESFilmicToneMapping } from "three"
import { Perf } from "r3f-perf"

import SplattingScene from "../SplattingMaterial/SplattingScene"
import NavigationScene from "../Navigation/NavigationScene"
import VideoScene from "../Video/VideoScene"
import MeshPortalScene from "../MeshPortal/MeshPortalScene"
import WallClippingScene from "../WallClipping/WallClippingScene"
import FpsScene from "../Fps/FpsScene"
import ParticleScene from "../Particle/ParticleScene"
import PathFindingScene from "../PathFinding/PathFindingScene"

import Camera from "./Camera"
import Environments from "./Environments"

export default function Webgl({ page }) {
  return (
    <div className="glContainer">
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true, toneMappingExposure: 1.0, toneMapping: ACESFilmicToneMapping }} shadows>
        <Suspense fallback={null}>

          {/* scenes */}
          { page == "splatting" && <SplattingScene /> }
          { page == "navigation" && <NavigationScene /> }
          { page == "video" && <VideoScene /> }
          { page == "meshportal" && <MeshPortalScene /> }
          { page == "wallclipping" && <WallClippingScene /> }
          { page == "fps" && <FpsScene /> }
          { page == "particle" && <ParticleScene /> }
          { page == "pathfinding" && <PathFindingScene /> }

          {/* defaults */}
          <Perf position={"top-left"} />
          <Camera page={page} />
          <Environments page={page} />
          <Preload all />

        </Suspense>
      </Canvas>
    </div>
  )
}
