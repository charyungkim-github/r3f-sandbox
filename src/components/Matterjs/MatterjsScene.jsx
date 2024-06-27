import { useEffect, useState } from "react"

import Demo from "./Demo"
import './matterjs.scss'

export default function MatterjsScene() {

  // TODO :: add matter js + device orientation

  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 })

  useEffect(() => {
    function handleOrientation(e) {
      setOrientation({ alpha: e.alpha, beta: e.beta, gamma: e.gamma })
      console.log(degreesToRadians(e.alpha))
    }
    window.addEventListener("deviceorientation", handleOrientation)
    return () => window.removeEventListener("deviceorientation", handleOrientation)
  }, [])

  return (
    <div className="matterjs">
      <h1>Device Orientation</h1>
      <ul>
        <li>Alpha (z) : {orientation.alpha?.toFixed(2)}</li>
        <li>Gamma (y): {orientation.gamma?.toFixed(2)}</li>
        <li>Beta (x): {orientation.beta?.toFixed(2)}</li>
      </ul>
      <Demo />
    </div>
  )
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180)
}