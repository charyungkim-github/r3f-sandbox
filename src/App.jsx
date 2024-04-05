import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'

import Webgl from './components/Webgl/Webgl'
import './styles/index.scss'

function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Webgl page="splatting" />} />
          <Route path="/pathfinding" element={<Webgl page="pathfinding" />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
