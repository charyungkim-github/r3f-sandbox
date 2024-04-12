import { useControls } from 'leva'

import useTestStore from './stores/useTestStore'

export default function TestInspector(props) {

  const environments = useTestStore( state => state.environments )
  const parallax = useTestStore( state => state.parallax )

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
  useTestStore.setState((state) => ({
    [key]: {
      ...state[key],
      [property]: value,
    },
  }))
}