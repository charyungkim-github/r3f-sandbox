import { useControls } from 'leva'

import useMeshPortalStore from './stores/useMeshPortalStore'

export default function MeshPortalInspector(props) {

  const environments = useMeshPortalStore( state => state.environments )
  const parallax = useMeshPortalStore( state => state.parallax )

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

  useControls("Parallax", {
    amount: {
      value: parallax.amount,
      onChange: (_value) => updateProperty('parallax', 'amount', _value)
    },
    lerp: {
      value: parallax.lerp,
      onChange: (_value) => updateProperty('parallax', 'lerp', _value)
    },
  }, { collapsed: true })

  return null
}

function updateProperty(key, property, value) {
  useMeshPortalStore.setState((state) => ({
    [key]: {
      ...state[key],
      [property]: value,
    },
  }))
}