import { useControls } from 'leva'

import useFpsStore from './stores/useFpsStore'

export default function FpsInspector(props) {

  const camera = useFpsStore( state => state.camera )
  const environments = useFpsStore( state => state.environments )

  useControls("Camera", {
    type: {
      value: camera.type,
      options: ["pointerlock", "orbit"],
      onChange: (_value) => updateProperty('camera', 'type', _value)
    },
  }, { collapsed: false })
  return null
}

function updateProperty(key, property, value) {
  useFpsStore.setState((state) => ({
    [key]: {
      ...state[key],
      [property]: value,
    },
  }))
}