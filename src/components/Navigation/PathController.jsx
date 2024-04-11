import { useEffect, useRef } from "react"
import { PivotControls } from "@react-three/drei"
import { CatmullRomCurve3, Color, Vector3 } from "three"

import useNavigationStore from "./stores/useNavigationStore"

export default function PathController({ initPoints, updatePath }) {

  const path = useNavigationStore( state => state.path )
  const setOrbit = useNavigationStore( state => state.setOrbit )
  const updatedPoints = useRef(initPoints)
  const geometry = useRef()
  const pivotControlsRefs = useRef([])
  const mouseStatus = useRef(false)
  const selectedPivotIndex = useRef(-1)

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
  }

  function onDragStart(index) {
    // orbit
    setOrbit(false)

    // pivot color
    updatePivotColor(selectedPivotIndex.current, "#618683")
    updatePivotColor(index, "#bde2df")

    // index
    selectedPivotIndex.current = index

    // status
    mouseStatus.current = 'pivot-selected'
  }

  function removePivot() {
    console.log("remove", selectedPivotIndex.current)
  }

  // Input Events
  useEffect(()=>{
    // key events
    const onKeyDown = (e) => {
      if(e.key == 'y') printPoints(updatedPoints.current)
      if(e.key == "Delete") removePivot()
    }
    // mouse events
    const onMouseDown = (e) => {
      if(mouseStatus.current == 'mouse-down') {
        updatePivotColor(selectedPivotIndex.current, "#618683")
        selectedPivotIndex.current = -1
      }
      mouseStatus.current = 'mouse-down'
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onMouseDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onMouseDown)
    }
  }, [])

  function updatePivotColor(index, color) {
    if(index >= 0) pivotControlsRefs.current[index].color.set(color)
  }

  return(
    <>
      <line visible={path.enablePivots}>
        <bufferGeometry ref={geometry}/>
        <meshBasicMaterial color={"#618683"} />
      </line>

      { path.enablePivots && initPoints.map((point, index) => (
          <PivotControls key={index} anchor={[0, 0, 0]} lineWidth={1} disableRotations disableScaling
            onDrag={ (e)=>onDrag(e, index) }
            onDragStart={ ()=>onDragStart(index) }
            onDragEnd={ ()=>setOrbit(true) }>
            <mesh position={[point.x, point.y, point.z]} scale={0.3}>
              <boxGeometry />
              <meshBasicMaterial ref={ref => pivotControlsRefs.current[index] = ref} color={'#618683'} />
            </mesh>
          </PivotControls>
      )) }
    </>
  )
}

function printPoints(points) {
  let val = 'const points = [\n'
  points.map( point => val += `  new Vector3(${point.x}, ${point.y}, ${point.z}),\n` )
  val += ']'
  console.log(val)
}