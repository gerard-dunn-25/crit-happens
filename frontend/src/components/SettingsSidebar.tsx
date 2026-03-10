import { motion, AnimatePresence } from 'framer-motion'

type SettingsSidebarProps = {
  isOpen: boolean
  onClose: () => void
  skipAnimation: boolean
  onSkipAnimationToggle: () => void
  onShowTutorial: () => void
}


export default function SettingsSidebar({
  isOpen,
  onClose,
  skipAnimation,
  onSkipAnimationToggle,
  onShowTutorial,
}: SettingsSidebarProps) {
  
  

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-30"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-0 left-0 h-full w-72 z-40 flex flex-col"
            style={{
              backgroundColor: 'var(--color-bg)',
              borderRight: '1px solid var(--color-border)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <h2
                className="text-lg uppercase tracking-widest"
                style={{
                  fontFamily: 'var(--font-title)',
                  color: 'var(--color-title)',
                }}
              >
                Settings
              </h2>
              <button
                onClick={onClose}
                className="text-[var(--color-text)] opacity-70 hover:opacity-100 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Settings */}
            <div className="flex flex-col gap-6 p-4">
              <div className="flex items-center justify-between">
                <span
                  className="text-sm"
                  style={{
                    fontFamily: 'var(--font-numbers)',
                    color: 'var(--color-text)',
                  }}
                >
                  Skip Spin Animation
                </span>
                <button
                  onClick={onSkipAnimationToggle}
                  className={`relative w-16 h-10 rounded-full transition-colors duration-300 flex items-center px-1 ${
                    skipAnimation
                      ? 'bg-[var(--color-toggle)]'
                      : 'bg-[var(--color-surface)]'
                  }`}
                >
                  <span
                    className={`absolute w-8 h-8 rounded-full transition-transform duration-300 bg-[var(--color-bg)] ${
                      skipAnimation ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="text-sm"
                  style={{
                    fontFamily: 'var(--font-numbers)',
                    color: 'var(--color-text)',
                  }}
                >
                  Show Tutorial
                </span>
                <button
                  onClick={onShowTutorial}
                  className="text-xs px-3 py-1 rounded"
                  style={{
                    backgroundColor: 'var(--color-title)',
                    color: 'var(--color-bg)',
                    fontFamily: 'var(--font-numbers)',
                  }}
                >
                  Show
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
