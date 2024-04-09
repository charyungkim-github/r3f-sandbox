import { create } from 'zustand'

export default create((set, get) => ({
  camera: {
    position: [0, 20, 25],
  },
  environments: {
    dirPosition: [-10, 20, 5],
    ambColor: "#ffffff",
    bgColor: "#618683",
  },
  orbit: true,
  setOrbit: (_state) => set(() => ({ orbit: _state })),
}))
