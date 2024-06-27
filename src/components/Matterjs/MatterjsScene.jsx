import { useEffect, useState } from "react"

import './matterjs.scss'

export default function MatterjsScene() {

  // TODO :: catch error when device does not support orientation
  // TOOD :: add matter js

  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 })

  useEffect(() => {
    function handleOrientation(e) {
      setOrientation({ alpha: e.alpha, beta: e.beta, gamma: e.gamma })
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
      {/* <div style={{ width: "100px", height: "100px", background: "rgba(0, 0, 0, 0.5)" }} /> */}
    </div>
  )
}
