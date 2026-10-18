import { useLang } from '../i18n/LanguageContext.jsx'
import './LanguageToggle.css'

// 右上角 中/EN 圆形开关，用法与背景音乐按钮同风格
export default function LanguageToggle() {
  const { lang, toggle } = useLang()
  return (
    <div className="lang-widget">
      <button
        type="button"
        className={`lang-toggle ${lang === 'en' ? 'is-active' : ''}`}
        data-lang={lang}
        onClick={toggle}
        aria-label={lang === 'zh' ? 'Switch to English' : '切换为中文'}
        title={lang === 'zh' ? 'English version' : '中文版'}
      >
        <span className="lang-en" aria-hidden="true">EN</span>
        <span className="lang-zh" aria-hidden="true">中</span>
      </button>
    </div>
  )
}
