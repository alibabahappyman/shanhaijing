import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ScrollPage from './pages/ScrollPage.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scroll/:jing" element={<ScrollPage />} />
      </Routes>
    </HashRouter>
  )
}
