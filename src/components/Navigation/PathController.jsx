import { useEffect, useRef } from "react"
import { PivotControls } from "@react-three/drei"
import { CatmullRomCurve3, Vector3 } from "three"

import useNavigationStore from "./stores/useNavigationStore"

export default function PathController({ initPoints, updatePath }) {

  const path = useNavigationStore( state => state.path )
  const setOrbit = useNavigationStore( state => state.setOrbit )
  const updatedPoints = useRef(initPoints)
  const geometry = useRef()

  useEffect(()=>{ createPath(initPoints) }, [])

  const createPath = (points)=>{
    const path = new CatmullRomCurve3(points, true)
    updatePath(path)
    geometry.current.setFromPoints(path.getPoints(50))
    updatedPoints.current = points
  }

  function onDrag(e, index) {

    // get position
    const handlePosition = new Vector3()
    handlePosition.setFromMatrixPosition(e)

    // update points
    const newUpdatedPoints = [...updatedPoints.current]
    newUpdatedPoints[index] = new Vector3(
      parseFloat( (initPoints[index].x + handlePosition.x).toFixed(2) ),
      parseFloat( (initPoints[index].y + handlePosition.y).toFixed(2) ),
      parseFloat( (initPoints[index].z + handlePosition.z).toFixed(2) )
    )

    // set path
    createPath(newUpdatedPoints)

    // orbit
    setOrbit(false)
  }

  useEffect(()=>{
    const onKeyDown = (e) => {
      if(e.key == 'y') printPoints(updatedPoints.current)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return(
    <>
      <line visible={path.enableLine}>
        <bufferGeometry ref={geometry}/>
        <meshBasicMaterial color={"#618683"} />
      </line>

      { path.enablePivots && initPoints.map((point, index) => (
          <PivotControls key={index} onDrag={(e)=>onDrag(e, index)} onDragEnd={()=>setOrbit(true)} anchor={[0, 0, 0]} disableRotations disableScaling lineWidth={1}>
            <mesh position={[point.x, point.y, point.z]} scale={0.1}>
              <boxGeometry />
              <meshBasicMaterial color={'#618683'} />
            </mesh>
          </PivotControls>
      )) }
    </>
  )
}

function printPoints(points) {
  console.log(points);
  let val = 'const points = [\n'
  points.map( point => val += `  new Vector3(${point.x}, ${point.y}, ${point.z}),\n` )
  val += ']'
  console.log(val);
}