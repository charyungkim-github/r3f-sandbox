import { useControls } from 'leva'

import useFpsStore from './stores/useFpsStore'

export default function FpsInspector(props) {

  const camera = useFpsStore( state => state.camera )
  const player = useFpsStore( state => state.player )
  const debug = useFpsStore( state => state.debug )

  useControls("Camera", {
    type: {
      value: camera.type,
      options: ["pointerlock", "orbit"],
      onChange: (_value) => updateProperty('camera', 'type', _value)
    },
  }, { collapsed: true })

  useControls("Player", {
    gravity: {
      value: player.gravity,
      onChange: (_value) => updateProperty('player', 'gravity', _value)
    },
    capsuleHeight: {
      value: player.capsuleHeight,
      onChange: (_value) => updateProperty('player', 'capsuleHeight', _value)
    },
    capsuleRadius: {
      value: player.capsuleRadius,
      onChange: (_value) => updateProperty('player', 'capsuleRadius', _value)
    },
    speed: {
      value: player.speed,
      onChange: (_value) => updateProperty('player', 'speed', _value)
    },
    speedOnAir: {
      value: player.speedOnAir,
      onChange: (_value) => updateProperty('player', 'speedOnAir', _value)
    },
    damping: {
      value: player.damping,
      onChange: (_value) => updateProperty('player', 'damping', _value)
    },
    cameraOffset: {
      value: player.cameraOffset,
      onChange: (_value) => updateProperty('player', 'cameraOffset', _value)
    },
  }, { collapsed: true })

  useControls("Debug", {
    enableOctreeHelper: {
      value: debug.enableOctreeHelper,
      onChange: (_value) => updateProperty('debug', 'enableOctreeHelper', _value)
    },
    enableOctreeMesh: {
      value: debug.enableOctreeMesh,
      onChange: (_value) => updateProperty('debug', 'enableOctreeMesh', _value)
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