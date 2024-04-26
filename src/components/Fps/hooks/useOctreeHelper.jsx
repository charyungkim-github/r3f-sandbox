import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { OctreeHelper } from 'three/examples/jsm/helpers/OctreeHelper'

import useFpsStore from '../stores/useFpsStore'

export default function useOctreeHelper(octree) {

  const enableOctreeHelper = useFpsStore(state => state.debug.enableOctreeHelper)

  const { scene } = useThree()

  useEffect(() => {
    if(!octree) return
    const helper = new OctreeHelper(octree, 'lightgreen')
    helper.name = 'octreeHelper'
    scene.add(helper)
    return () => scene.remove(helper)
  }, [octree, scene])

  useEffect(()=> {
    if(!octree) return
    scene.getObjectByName('octreeHelper').visible = enableOctreeHelper
  }, [octree, enableOctreeHelper])
}
