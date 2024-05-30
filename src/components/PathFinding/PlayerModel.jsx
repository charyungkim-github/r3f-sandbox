import { forwardRef, useEffect, useRef } from "react"
import { useAnimations, useGLTF } from "@react-three/drei"

const PlayerModel = forwardRef((props, ref) => {

  const { nodes, materials, animations } = useGLTF('/models/player.glb')
  const { actions } = useAnimations(animations, ref)

  const currentAction = useRef('')

  useEffect(()=>{
    actions["Main_Run"].timeScale = 1.2
    play('idle')
    return () => {
      actions["Main_Run"].stop()
      actions["Main_Idle"].stop()
      currentAction.current = ''
    }
  }, [])

  const play = (action) => {
    if(action == 'run') {
      if(currentAction.current == 'run') return
      actions["Main_Idle"].fadeOut(0.2)
      actions["Main_Run"].reset().fadeIn(0.2).play()
      currentAction.current = 'run'
    }
    else if(action == 'idle') {
      if(currentAction.current == 'idle') return
      actions["Main_Run"].fadeOut(0.2)
      actions["Main_Idle"].reset().fadeIn(0.2).play()
      currentAction.current = 'idle'
    }
  }

  return(
    <group ref={ref} {...props} dispose={null} play={play} >
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
        </group>
        <skinnedMesh name="Main_Body" geometry={nodes.Main_Body.geometry} material={materials.Main_Body_s} skeleton={nodes.Main_Body.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <skinnedMesh name="Main_Outfit" geometry={nodes.Main_Outfit.geometry} material={materials.Main_Outfit_s} skeleton={nodes.Main_Outfit.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </group>
    </group>
  )
})

useGLTF.preload("/models/player.glb")
export default PlayerModel