import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { OctreeHelper } from 'three/examples/jsm/helpers/OctreeHelper'

import useFpsStore from '../stores/useFpsStore'

export default function useOctreeHelper(octree) {

  const debug = useFpsStore(state => state.debug.enableOctreeHelper)

  const { scene } = useThree()

  useEffect(() => {
    const helper = new OctreeHelper(octree, 'lightgreen')
    helper.name = 'octreeHelper'
    scene.add(helper)
    return () => scene.remove(helper)
  }, [octree, scene])

  useEffect(()=> {
    scene.getObjectByName('octreeHelper').visible = debug
  }, [debug])
}
