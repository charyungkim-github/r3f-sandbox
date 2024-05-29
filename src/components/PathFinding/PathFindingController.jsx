import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Pathfinding } from 'three-pathfinding'
import { MathUtils, Vector3 } from 'three'

import NavmeshModel from './NavmeshModel'
import PlayerModel from './PlayerModel'

const moveSpeed = 1
const rotationSpeed = 0.1
const playerPosition = new Vector3(-3.5, 0.5, 5.5)
const upVector = new Vector3(0, 1, 0)
const rightUpVector = new Vector3(1, 1, 0)
let targetAngle = Math.PI

export default function PathFindingController() {

  const pathfinding = useRef()
  const path = useRef()
  const navmeshRef = useRef()
  const playerRef = useRef()

  useEffect(()=>{
    // init pathfinding
    const zone = Pathfinding.createZone(navmeshRef.current.geometry)
    pathfinding.current = new Pathfinding()
    pathfinding.current.setZoneData( '', zone )

    // init player
    teleport(playerPosition)
  }, [])

  useFrame((state, delta)=>{

    if (!navmeshRef.current || !path.current || path.current.length == 0) return

    const velocity = path.current[0].clone().sub(playerPosition)

    if (velocity.lengthSq() > 0.02) {
      // move player
      playerPosition.add(velocity.normalize().multiplyScalar(delta * moveSpeed))
      playerRef.current.position.copy(playerPosition)

      // rotate player
      targetAngle = getTargetAngle(velocity, targetAngle, rotationSpeed)
      playerRef.current.setRotationFromAxisAngle(upVector, targetAngle)

      // play animation
      playerRef.current.play('run')
    }
    else {
      // remove node from the path player passed
      path.current.shift()

      // play animation
      playerRef.current.play('idle')
    }
  })

  function findPath(targetPosition) {
    path.current = pathfinding.current.findPath(playerPosition, targetPosition, '', 0)
  }

  function teleport(targetPosition) {
    // clear path
    path.current = null

    // move player
    playerPosition.copy(targetPosition)
    playerRef.current.position.copy(playerPosition)

    // rotate player
    const direction = playerPosition.clone().multiply(rightUpVector).sub(playerPosition)
    const angle = Math.atan2(direction.x, direction.z)
    playerRef.current.setRotationFromAxisAngle(upVector, angle)

    // play animation
    playerRef.current.play('idle')
  }

  return(
    <>
      <NavmeshModel ref={navmeshRef} onClick={(e)=>findPath(e.point)} onContextMenu={(e)=>teleport(e.point)}/>
      <PlayerModel ref={playerRef} scale={5} />
    </>
  )
}

function getTargetAngle(velocity, prevAngle, speed) {
  const angle =  Math.atan2(velocity.x, velocity.z)
  const deltaAngle = angle - prevAngle
  const wrapAngle = deltaAngle - Math.PI * 2 * Math.floor((deltaAngle + Math.PI) / (Math.PI * 2))
  return MathUtils.lerp(prevAngle, prevAngle + wrapAngle, speed)
}