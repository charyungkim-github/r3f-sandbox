import { useEffect, useRef } from "react"
import { useAnimations, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

import useNavigationStore from "./stores/useNavigationStore"

export default function Player({path, ...props}) {

  const movement = useNavigationStore( state => state.movement )

  const group = useRef()
  const time = useRef(0)

  const { nodes, materials, animations } = useGLTF('/models/player.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(()=>{
    if(movement.status == 'run') {
      actions["Main_Idle"].fadeOut(0.2)
      actions["Main_Run"].reset().fadeIn(0.2).play()
    }
    else if(movement.status == 'idle') {
      actions["Main_Run"].fadeOut(0.2)
      actions["Main_Idle"].reset().fadeIn(0.2).play()
    }
  }, [movement.status])

  useFrame((_, delta)=> {
    if(movement.status != 'run') return

    // update time
    time.current += delta
    const t = (time.current % movement.duration) / movement.duration

    // position
    const position = path.getPointAt(t)
    group.current.position.copy(position)

    // rotation
    const rotation = path.getTangentAt(t).normalize()
    group.current.lookAt(position.clone().add(rotation))
  })

  return (
    <group ref={group} {...props} dispose={null} >
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
        </group>
        <skinnedMesh name="Main_Body" geometry={nodes.Main_Body.geometry} material={materials.Main_Body_s} skeleton={nodes.Main_Body.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <skinnedMesh name="Main_Outfit" geometry={nodes.Main_Outfit.geometry} material={materials.Main_Outfit_s} skeleton={nodes.Main_Outfit.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/player.glb')
