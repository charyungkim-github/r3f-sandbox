import { create } from 'zustand'

export default create((set, get) => ({
  camera: {
    position: [0, 20, 25],
  },
  environments: {
    dirPosition: [-10, 20, 5],
    ambColor: "#e0b270",
    bgColor: "#ffffff",
  },
  parallax: {
    amount: 4,
    lerp: 0.01,
  },
}))
