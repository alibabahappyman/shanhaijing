import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ScrollPage from './pages/ScrollPage.jsx'
import BestiaryPage from './pages/BestiaryPage.jsx'
import DahuangCards from './pages/DahuangCards.jsx'
import HaiJingPage from './pages/HaiJingPage.jsx'
import EditorNotePage from './pages/EditorNotePage.jsx'
import BackgroundMusic from './components/BackgroundMusic.jsx'
import LanguageToggle from './components/LanguageToggle.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'

export default function App() {
  return (
    <HashRouter>
      <LanguageProvider>
        <BackgroundMusic>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scroll/:jing" element={<ScrollPage />} />
          <Route path="/bestiary" element={<BestiaryPage />} />
          <Route path="/dahuang" element={<DahuangCards />} />
          <Route path="/haijing/:realm" element={<HaiJingPage />} />
          <Route path="/editor-note" element={<EditorNotePage />} />
        </Routes>
        </BackgroundMusic>
        <LanguageToggle />
      </LanguageProvider>
    </HashRouter>
  )
}
