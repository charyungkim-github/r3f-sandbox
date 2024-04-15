import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'

import Webgl from './components/Common/Webgl'
import './styles/index.scss'

function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Webgl page="splatting" />} />
          <Route path="/navigation" element={<Webgl page="navigation" />} />
          <Route path="/video" element={<Webgl page="video" />} />
          <Route path="/meshportal" element={<Webgl page="meshportal" />} />
          <Route path="/wallclipping" element={<Webgl page="wallclipping" />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
