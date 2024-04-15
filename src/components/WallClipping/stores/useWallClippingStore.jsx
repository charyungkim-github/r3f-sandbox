import { create } from 'zustand'

export default create((set, get) => ({
  camera: {
    offset: [0, 0, 0],
    lookAt: [0, 0, 0],
    fov: 60,
    near: 0.2,
    far: 1000,
  },
  controls: {
    enable: true,
    position: [-37, 14, 46],
    fov: 60,
    near: 0.2,
    far: 1000,
    dollySpeed: 0.3,
    truckSpeed: 0.3,
    minPolarAngle: -Infinity,
    maxPolarAngle: Infinity,
  },
  environments: {
    dirPosition: [-10, 20, 5],
    ambColor: "#ffffff",
    ambIntensity: 3,
    bgColor: "sky",
  },
  movement: {
    speed: 1,
  },
  physics: {
    debug: true,
    keyboardMap: [
      { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
      { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
      { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
      { name: 'right', keys: ['ArrowRight', 'KeyD'] },
      { name: 'up', keys: ['KeyQ'] },
      { name: 'down', keys: ['KeyE'] },
      { name: 'jump', keys: ['Space'] },
      { name: 'run', keys: ['Shift'] },
      { name: 'logCamera', keys: ['KeyT'] }, // for debug
      { name: 'logPlayer', keys: ['KeyY'] }, // for debug
    ]
  }
}))
