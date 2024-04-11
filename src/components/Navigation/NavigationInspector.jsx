import { useControls } from 'leva'

import useNavigationStore from './stores/useNavigationStore'

export default function NavigationInspector(props) {

  const camera = useNavigationStore( state => state.camera )
  const environments = useNavigationStore( state => state.environments )
  const movement = useNavigationStore( state => state.movement )
  const path = useNavigationStore( state => state.path )

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

  useControls("Movement", {
    status: {
      value: movement.status,
      options: ["idle", "run"],
      onChange: (_value) => updateProperty('movement', 'status', _value)
    },
    duration: {
      value: movement.duration,
      onChange: (_value) => updateProperty('movement', 'duration', _value)
    },

  }, { collapsed: false })

  useControls("Path", {
    enableLine: {
      value: path.enableLine,
      onChange: (_value) => updateProperty('path', 'enableLine', _value)
    },
    enablePivots: {
      value: path.enablePivots,
      onChange: (_value) => updateProperty('path', 'enablePivots', _value)
    },

  }, { collapsed: false })

  return null
}

function updateProperty(key, property, value) {
  useNavigationStore.setState((state) => ({
    [key]: {
      ...state[key],
      [property]: value,
    },
  }))
}