import { create } from 'zustand'

export default create((set, get) => ({
  camera: {
    position: [0, 0, 10],
    orbit: true
  },
  environments: {
    dirPosition: [-10, 20, 5],
    ambColor: "#e0b270",
    bgColor: "#ffffff",
  },
}))
