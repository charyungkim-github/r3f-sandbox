import { forwardRef } from "react"

const IndicatorModel = forwardRef((props, ref) => {

  const moveTo = (targetPosition) => {
    ref.current.visible = true
    ref.current.position.copy(targetPosition)
  }

  return(
    <group ref={ref} moveTo={moveTo}>
      <mesh position-y={0.1} scale={0.2}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color='red' transparent opacity={0.2}/>
      </mesh>
    </group>
  )
})

export default IndicatorModel