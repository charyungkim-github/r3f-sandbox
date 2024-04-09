import { useEffect, useRef, forwardRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { PivotControls, useAnimations, useGLTF } from "@react-three/drei"
import { CatmullRomCurve3, Vector3 } from "three"
import { button, useControls } from "leva"

import NavigationInspector from "./NavigationInspector"
import useNavigationStore from "./stores/useNavigationStore"

// TODO :: refactor, clean up
// TODO :: copy positions
// TODO :: add debug key

export default function NavigationScene() {

  const setOrbit = useNavigationStore(state=>state.setOrbit)

  const duration = 20
  const points = [
    new Vector3(0, 0, 0),
    new Vector3(-5, 0, 5),
    new Vector3(-10, 0, 10),
    new Vector3(10, 0, 10),
    new Vector3(5, 0, 5),
  ]

  const [path, setPath] = useState(new CatmullRomCurve3(points, true))
  const [updatedPoints, setUpdatedPoints] = useState(points)

  const player = useRef(null)
  const start = useRef(false)
  const time = useRef(0)

  useControls('Play', {
    start: button( (get) => {
      start.current = true
      player.run()
    }),
    stop: button( (get) => {
      start.current = false
      player.idle()
    }),
  })

  useFrame((state, delta)=>{
    if(!start.current) return

    // update time
    time.current += delta
    const t = (time.current % duration) / duration

    // position
    const position = path.getPointAt(t)
    player.current.position.copy(position)

    // rotation
    const rotation = path.getTangentAt(t).normalize()
    player.current.lookAt(position.clone().add(rotation))
  })

  function onDrag(e, index) {

    // get position
    const handlePosition = new Vector3()
    handlePosition.setFromMatrixPosition(e)

    // update points
    const newUpdatedPoints = [...updatedPoints]
    newUpdatedPoints[index] = new Vector3(
      parseFloat( (points[index].x + handlePosition.x).toFixed(2) ),
      parseFloat( (points[index].y + handlePosition.y).toFixed(2) ),
      parseFloat( (points[index].z + handlePosition.z).toFixed(2) )
    )
    setUpdatedPoints(newUpdatedPoints)

    // set path
    setPath(new CatmullRomCurve3(newUpdatedPoints, true))

    // orbit
    setOrbit(false)
  }
  return (
    <>
      <NavigationInspector />
      <PlayerModel ref={player} />
      <Floor />
      { points.map((point, index) => (
          <PivotControls key={index} onDrag={(e)=>onDrag(e, index)} onDragEnd={()=>setOrbit(true)} anchor={[0, 0, 0]} disableRotations disableScaling lineWidth={1}>
            <mesh position={[point.x, point.y, point.z]} scale={0.1}>
              <boxGeometry />
              <meshBasicMaterial color={'#618683'} />
            </mesh>
          </PivotControls>
      )) }
      <Path path={path} />
    </>
  )
}

const Floor = (props) => {
  return(
    <mesh scale={[30, 0.1, 30]} position={[0, -0.1, 0]}>
      <boxGeometry args={[1, 1]} />
      <meshBasicMaterial color={'#0f544e'} />
    </mesh>
  )
}

const Path = (props) => {
  const geometry = useRef()

  useEffect(()=>{
    geometry.current.setFromPoints(props.path.getPoints(50))
  }, [props.path])

  return(
    <>
      <line>
        <bufferGeometry ref={geometry}/>
        <meshBasicMaterial color={"#618683"} />
      </line>
    </>
  )
}

const PlayerModel = forwardRef ((props, ref) => {

  const { nodes, materials, animations } = useGLTF('/models/player.glb')
  const { actions } = useAnimations(animations, ref)

  useEffect(()=>{
    actions["Main_Idle"].play()
    ref.run = () => {
      actions["Main_Idle"].fadeOut(0.2)
      actions["Main_Run"].reset().fadeIn(0.2).play()
    }
    ref.idle = () => {
      actions["Main_Run"].fadeOut(0.2)
      actions["Main_Idle"].reset().fadeIn(0.2).play()
    }
  }, [])

  return (
    <group ref={ref} {...props} dispose={null} scale={10}>
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

useGLTF.preload('/models/player.glb')
