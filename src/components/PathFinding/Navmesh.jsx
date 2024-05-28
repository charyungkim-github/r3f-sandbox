import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { Pathfinding, PathfindingHelper } from 'three-pathfinding'

const ZONE = 'level'
const SPEED = 5
const playerPosition = new Vector3( -3.5, 0.5, 5.5 )
const targetPosition = new Vector3()

export default function Navmesh() {
  return(
    <>
      <Nav />
    </>
  )
}

function Nav() {

  const { nodes } = useGLTF('/models/level-nav.glb')
  const { scene } = useThree()

  const navmesh = useRef()
  const pathfinding = useRef()
  const pathfindingHelper = useRef()
  const groupID = useRef()
  const path = useRef()

  useEffect(()=>{
    pathfinding.current = new Pathfinding()
    const zone = Pathfinding.createZone(navmesh.current.geometry)
    pathfinding.current.setZoneData( ZONE, zone )
    groupID.current = pathfinding.current.getGroup( ZONE, playerPosition )

    pathfindingHelper.current = new PathfindingHelper()
    pathfindingHelper.current.setPlayerPosition( playerPosition )
    pathfindingHelper.current.setTargetPosition( playerPosition )
    scene.add(pathfindingHelper.current)
  }, [])

  useFrame((state, delta)=>{
    if ( !navmesh.current || !(path.current||[]).length ) return

    let targetPosition = path.current[ 0 ]
    const velocity = targetPosition.clone().sub( playerPosition )

    if (velocity.lengthSq() > 0.05 * 0.05) {
      velocity.normalize()
      // Move player to target
      playerPosition.add( velocity.multiplyScalar( delta * SPEED ) )
      pathfindingHelper.current.setPlayerPosition( playerPosition )
    } else {
      // Remove node from the path we calculated
      path.current.shift()
    }
  })

  function onPointerUp(event) {

    targetPosition.copy(event.point)

    pathfindingHelper.current.reset().setPlayerPosition(playerPosition)

    // Teleport on ctrl/cmd click or RMB.
    if (event.metaKey || event.ctrlKey || event.button === 2) {
      path.current = null
      groupID.current = pathfinding.current.getGroup(ZONE, targetPosition, true)
      const closestNode = pathfinding.current.getClosestNode(
        playerPosition,
        ZONE,
        groupID.current,
        true
      )

      pathfindingHelper.current.setPlayerPosition(playerPosition.copy(targetPosition))
      if (closestNode) pathfindingHelper.current.setNodePosition(closestNode.centroid)
      return
    }

    const targetGroupID = pathfinding.current.getGroup(ZONE, targetPosition, true)
    const closestTargetNode = pathfinding.current.getClosestNode(
      targetPosition,
      ZONE,
      targetGroupID,
      true
    )

    pathfindingHelper.current.setTargetPosition(targetPosition)
    if (closestTargetNode) pathfindingHelper.current.setNodePosition(closestTargetNode.centroid)

    // Calculate a path to the target and store it
    path.current = pathfinding.current.findPath(playerPosition, targetPosition, ZONE, groupID.current)

    if (path.current && path.current.length) {
      pathfindingHelper.current.setPath(path.current)
    } else {
      const closestPlayerNode = pathfinding.current.getClosestNode(
        playerPosition,
        ZONE,
        groupID.current
      )
      const clamped = new Vector3()

      // TODO(donmccurdy): Don't clone targetPosition, fix the bug.
      pathfinding.current.clampStep(
        playerPosition,
        targetPosition.clone(),
        closestPlayerNode,
        ZONE,
        groupID.current,
        clamped
      )

      pathfindingHelper.current.setStepPosition(clamped)
    }
  }

  return(
    <>
      <group dispose={null}>
        <mesh ref={navmesh} geometry={nodes.Navmesh_Mesh.geometry} onPointerUp={onPointerUp}>
          <meshBasicMaterial color='#ffffff' opacity={0.75} transparent={true} />
        </mesh>
      </group>
    </>
  )
}

useGLTF.preload("/models/level-nav.glb")
