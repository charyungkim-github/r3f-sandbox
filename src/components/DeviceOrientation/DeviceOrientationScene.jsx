import { useEffect, useState } from "react"
import './deviceOrientation.scss'

export default function DeviceOrientationScene() {

  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 })

  useEffect(() => {
    function handleOrientation(e) {
      setOrientation({ alpha: e.alpha.toFixed(2), beta: e.beta.toFixed(2), gamma: e.gamma.toFixed(2) })
    }
    window.addEventListener("deviceorientation", handleOrientation)
    return () => window.removeEventListener("deviceorientation", handleOrientation)
  }, [])

  return (
    <div className="device-orientation">
      <h1>Device Orientation</h1>
      <ul>
        <li>Alpha (z) : {orientation.alpha}</li>
        <li>Gamma (y): {orientation.gamma}</li>
        <li>Beta (x): {orientation.beta}</li>
      </ul>
      {/* <div style={{ width: "100px", height: "100px", background: "rgba(0, 0, 0, 0.5)" }} /> */}
    </div>
  )
}
