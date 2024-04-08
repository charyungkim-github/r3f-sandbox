import { Html, useVideoTexture } from '@react-three/drei'
import { useMemo } from "react"
import { LottieLoader } from "three/examples/jsm/Addons.js"

import VideoInspector from "./VideoInspector"

export default function VideoScene() {
  const scale = [3.2, 1.8, 1]
  const url = '/video/media_a.mp4'

  const lottieLoader = new LottieLoader()
  const lottie = lottieLoader.load('/lottie/megaphone.json')

  const [ threeVideo ] = useMemo( () => {
    const video = document.createElement("video")
    video.crossOrigin = "Anonymous"
    video.src = url
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.preload = 'auto'
    video.oncanplay = (e) => video.play()
    return [video]
  }, [])

  const dreiVideo = useVideoTexture(url)


  return (
    <>
      <VideoInspector />

      <mesh scale={scale} position-x={-3}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial side={2} toneMapped={false} map={lottie} />
        <Html position-y={-0.6}>
          <div>Lottie</div>
        </Html>
      </mesh>

      <mesh scale={scale} position-x={0}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial side={2} toneMapped={false}>
          <videoTexture attach="map" args={[threeVideo]} flipY={true} />
        </meshBasicMaterial>
        <Html position-y={-0.6}>
          <div>threejs-videoTexture</div>
        </Html>
      </mesh>

      <mesh scale={scale} position-x={3}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial side={2} toneMapped={false} map={dreiVideo} />
        <Html position-y={-0.6}>
          <div>drei-videoTexture</div>
        </Html>
      </mesh>
    </>
  )
}