import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'

import Webgl from './components/Common/Webgl'
import UI from './components/Common/UI'
import './styles/index.scss'


function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          {/* webgl */}
          <Route path="/" element={<Webgl page="splatting" />} />
          <Route path="/navigation" element={<Webgl page="navigation" />} />
          <Route path="/video" element={<Webgl page="video" />} />
          <Route path="/meshportal" element={<Webgl page="meshportal" />} />
          <Route path="/wallclipping" element={<Webgl page="wallclipping" />} />
          <Route path="/fps" element={<Webgl page="fps" />} />
          <Route path="/particle" element={<Webgl page="particle" />} />
          <Route path="/pathfinding" element={<Webgl page="pathfinding" />} />

          {/* ui */}
          <Route path="/device-orientation" element={<UI page="device-orientation" />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
