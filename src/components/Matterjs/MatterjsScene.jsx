import { useEffect, useState } from "react"

import Demo from "./Demo"
import './matterjs.scss'

/*
Make sure in the vite.config.js plugins setup for the https.
https required for device orientation.
// plugins: [react(),  glsl(), basicSsl()],
*/

export default function MatterjsScene() {

  // TODO :: add matter js + device orientation
  // TODO :: clean up matter init (use store? use memo?)

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
      <Demo orientation={orientation} />
    </div>
  )
}