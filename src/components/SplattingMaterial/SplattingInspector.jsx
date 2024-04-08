import { useControls } from 'leva'

import useSplattingStore from './stores/useSplattingStore'

export default function SplattingInspector(props) {

  const camera = useSplattingStore( state => state.camera )
  const environments = useSplattingStore( state => state.environments )

  useControls("Camera", {
    position: {
      value: camera.position,
      onChange: (_value) => updateProperty('camera', 'position', _value)
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
  useSplattingStore.setState((state) => ({
    [key]: {
      ...state[key],
      [property]: value,
    },
  }))
}