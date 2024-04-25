import { create } from 'zustand'

export default create((set, get) => ({
  camera: {
    type: 'orbit' // pointerlock, orbit
  },
  player: {
    gravity: 30,
    capsuleHeight: 1.8,
    capsuleRadius: 0.5,
    speed: 25,
    speedOnAir: 4,
    damping: 4,
    cameraOffset: [0, 0, 1]
  },
  environments: {
    dirPosition: [-10, 20, 5],
    ambColor: "#e0b270",
    bgColor: "#ffffff",
  },
}))
