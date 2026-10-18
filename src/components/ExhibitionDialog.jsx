import { useEffect, useRef } from 'react'

// Native modal supplies focus containment, Escape dismissal and focus restoration.
export default function ExhibitionDialog({ title, kind, onClose, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <dialog
      ref={ref}
      className={`sh-dialog sh-dialog--${kind}`}
      aria-labelledby="sh-dialog-title"
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <div className="sh-dialog-body">
        <header className="sh-dialog-heading">
          <div><span className="sh-eyebrow">山海经 · 画中手记</span><h2 id="sh-dialog-title">{title}</h2></div>
          <button className="sh-close" onClick={onClose} aria-label="关闭">×</button>
        </header>
        {children}
      </div>
    </dialog>
  )
}
