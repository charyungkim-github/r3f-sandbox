import { useControls } from 'leva'

import useWallClippingStore from './stores/useWallClippingStore'

export default function WallClippingInspector(props) {

  const camera = useWallClippingStore( state => state.camera )
  const controls = useWallClippingStore( state => state.controls )
  const environments = useWallClippingStore( state => state.environments )

  useControls("Camera", {
    offset: {
      value: camera.offset,
      onChange: (_value) => updateProperty('camera', 'offset', _value)
    },
    lookAt: {
      value: camera.lookAt,
      onChange: (_value) => updateProperty('camera', 'lookAt', _value)
    },
  }, { collapsed: true })

  useControls("Controls", {
    enable: {
      value: controls.enable,
      onChange: (_value) => updateProperty('controls', 'enable', _value)
    },
    position: {
      value: controls.position,
      onChange: (_value) => updateProperty('controls', 'position', _value)
    },
    dollySpeed: {
      value: controls.dollySpeed,
      onChange: (_value) => updateProperty('controls', 'dollySpeed', _value)
    },
    truckSpeed: {
      value: controls.truckSpeed,
      onChange: (_value) => updateProperty('controls', 'truckSpeed', _value)
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