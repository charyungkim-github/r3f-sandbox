import { useControls } from 'leva'

import useWallClippingStore from './stores/useWallClippingStore'

export default function WallClippingInspector(props) {

  const camera = useWallClippingStore( state => state.camera )
  const environments = useWallClippingStore( state => state.environments )

  useControls("Camera", {
    position: {
      value: camera.position,
      onChange: (_value) => updateProperty('camera', 'position', _value)
    },
    dollySpeed: {
      value: camera.dollySpeed,
      onChange: (_value) => updateProperty('camera', 'dollySpeed', _value)
    },
    truckSpeed: {
      value: camera.truckSpeed,
      onChange: (_value) => updateProperty('camera', 'truckSpeed', _value)
    },
  }, { collapsed: true })

  useControls("Environments", {
    dirPosition: {
      value: environments.dirPosition,
      onChange: (_value) => updateProperty('environments', 'dirPosition', _value)
    },
    ambColor: {
      value: environments.ambColor,
      onChange: (_value) => updateProperty('environments', 'ambColor', _value)
    },
    bgColor: {
      value: environments.bgColor,
      onChange: (_value) => updateProperty('environments', 'bgColor', _value)
    },
  }, { collapsed: true })
  return null
}

function updateProperty(key, property, value) {
  useWallClippingStore.setState((state) => ({
    [key]: {
      ...state[key],
      [property]: value,
    },
  }))
}