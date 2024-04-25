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
    cameraOffset: [0, 0, 0]
  },
  environments: {
    dirPosition: [-10, 20, 5],
    ambColor: "#e0b270",
    bgColor: "#ffffff",
  },
  debug: {
    enableOctreeHelper: false,
    enableOctreeMesh: true,
  },
  keymap: [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
  ]
}))
