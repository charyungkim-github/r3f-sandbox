import { useMemo } from 'react'
import { Octree } from 'three/examples/jsm/math/Octree'

export default function useOctree(scene) {
  const octree = useMemo(() => {
    if(scene == undefined) return
    return new Octree().fromGraphNode(scene)
  }, [scene])

  return octree
}