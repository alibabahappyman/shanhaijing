import { createContext, useContext, useEffect, useMemo, useState } from 'react'

// 全局语言状态：与 CGTN「The Song, Painted」同思路 ——
// 同一页面同一版式，右上角 中/EN 开关只切换文字，选择存 localStorage。
const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => (localStorage.getItem('xianhua-lang') === 'en' ? 'en' : 'zh'))

  useEffect(() => {
    localStorage.setItem('xianhua-lang', lang)
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN'
  }, [lang])

  const value = useMemo(() => ({
    lang,
    setLang,
    toggle: () => setLang((v) => (v === 'zh' ? 'en' : 'zh')),
    // 取双语文案：t({ zh: '山', en: 'Mountain' })
    t: (obj) => (obj == null ? '' : lang === 'en' ? (obj.en ?? obj.zh) : (obj.zh ?? obj.en)),
  }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLang = () => useContext(LanguageContext)
