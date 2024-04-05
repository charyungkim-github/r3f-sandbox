import { create } from 'zustand'

export default create((set, get) => ({

  /* Splatting */
  splatting: {
    camera: {
      position: [-3, 15, 10.5],
    },
    environments: {
      dirPosition: [-10, 20, 5],
      ambColor: "#e0b270",
      bgColor: "#ffffff",
    },
  },

  /* Navigation */
  navigation: {
    camera: {
      position: [-5, 10, 10],
    },
    environments: {
      dirPosition: [-10, 20, 5],
      ambColor: "#e0b270",
      bgColor: "#ffffff",
    },
  },

  /* Update */
  update: (page, key, property, value) =>
    set((state) => ({
      [page]: {
        ...state[page],
        [key]: {
          ...state[page][key],
          [property]: value,
        },
      },
    })),
}))