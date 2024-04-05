import { useControls } from 'leva'

import useAppStore from './stores/useAppStore'

export default function DebugInspector({page}) {

  // store
  const store = useAppStore( state => state[page] )
  const update = useAppStore( state => state.update )

  // camera
  useControls("Camera", {
    position: {
      value: store.camera.position,
      onChange: (_value) => update(page, 'camera', 'position', _value)
    },
  }, { collapsed: true })

  // environments
  useControls("Environments", {
    dirPosition: {
      value: store.environments.dirPosition,
      onChange: (_value) => update(page, 'environments', 'dirPosition', _value)
    },
    ambColor: {
      value: store.environments.ambColor,
      onChange: (_value) => update(page, 'environments', 'ambColor', _value)
    },
    bgColor: {
      value: store.environments.bgColor,
      onChange: (_value) => update(page, 'environments', 'bgColor', _value)
    },
  }, { collapsed: true })

  return null
}

