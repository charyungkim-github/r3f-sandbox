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
        </Routes>
      </Suspense>
    </>
  )
}

export default App
