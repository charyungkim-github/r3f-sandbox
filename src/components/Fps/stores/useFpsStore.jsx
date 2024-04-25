import { create } from 'zustand'

export default create((set, get) => ({
  camera: {
    type: 'pointerlock'
  },

  environments: {
    dirPosition: [-10, 20, 5],
    ambColor: "#e0b270",
    bgColor: "#ffffff",
  },
}))
