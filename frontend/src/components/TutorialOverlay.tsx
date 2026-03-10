import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type TutorialStep = {
  target: string
  title: string
  description: string
  tooltipPosition: 'above' | 'below'
}

const steps: TutorialStep[] = [
  {
    target: 'dice-selector',
    title: 'Select Your Dice',
    description: 'Tap here to open the dice selector.',
    tooltipPosition: 'below',
  },
  {
    target: 'dice-types',
    title: 'Choose Your Dice Type',
    description: 'Pick from d4 through d20.',
    tooltipPosition: 'below',
  },
  {
    target: 'dice-count',
    title: 'Set Number of Dice',
    description: 'Use + and - to roll up to 6 dice at once.',
    tooltipPosition: 'below',
  },
  {
    target: 'settings',
    title: 'Settings',
    description:
      'Tap the title to access settings like skipping the spin animation.',
    tooltipPosition: 'below',
  },
  {
    target: 'roll-button',
    title: 'Roll!',
    description: 'Tap Roll and watch for critical hits, they glow red!',
    tooltipPosition: 'above',
  },
]

type TutorialOverlayProps = {
  isOpen: boolean
  onComplete: () => void
  dropdownOpen: boolean
  onOpenDropdown: () => void
}

export default function TutorialOverlay({
  isOpen,
  onComplete,
  dropdownOpen,
  onOpenDropdown,
}: TutorialOverlayProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)

  const currentStep = steps[stepIndex]
  const isDropdownStep =
    currentStep.target === 'dice-types' || currentStep.target === 'dice-count'

  useEffect(() => {
    if (!isOpen) return

    if (isDropdownStep && !dropdownOpen) {
      onOpenDropdown()
      return
    }

    const timeout = setTimeout(() => {
      const el = document.querySelector(
        `[data-tutorial="${currentStep.target}"]`,
      )
      if (el) {
        setTargetRect(el.getBoundingClientRect())
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [
    isOpen,
    stepIndex,
    dropdownOpen,
    isDropdownStep,
    currentStep.target,
    onOpenDropdown,
  ])

  if (!isOpen || !targetRect) return null

  const padding = 8
  const glowRect = {
    top: targetRect.top - padding,
    left: targetRect.left - padding,
    width: targetRect.width + padding * 2,
    height: targetRect.height + padding * 2,
  }

  function handleNext() {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      onComplete()
    }
  }

  function handleSkip() {
    onComplete()
  }

  const isLastStep = stepIndex === steps.length - 1

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Dark overlay */}
        <div
          className="absolute inset-0 bg-black pointer-events-auto"
          style={{ opacity: 0.6 }}
          onClick={handleNext}
        />

        {/* Glow highlight */}
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute pointer-events-none"
          style={{
            top: glowRect.top,
            left: glowRect.left,
            width: glowRect.width,
            height: glowRect.height,
            borderRadius: '8px',
            boxShadow: `0 0 0 2px var(--color-title), 0 0 16px 4px var(--color-title)`,
            zIndex: 51,
          }}
        />

        {/* Tooltip */}
        <motion.div
          key={`tooltip-${stepIndex}`}
          initial={{
            opacity: 0,
            y: currentStep.tooltipPosition === 'below' ? -8 : 8,
          }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="absolute pointer-events-auto"
          style={{
            left: Math.min(
              Math.max(glowRect.left + glowRect.width / 2 - 140, 16),
              window.innerWidth - 296,
            ),
            top:
              currentStep.tooltipPosition === 'below'
                ? glowRect.top + glowRect.height + 12
                : glowRect.top - 120,
            width: '280px',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '12px 16px',
            zIndex: 52,
          }}
        >
          <p
            className="text-sm font-bold mb-1"
            style={{
              fontFamily: 'var(--font-title)',
              color: 'var(--color-title)',
            }}
          >
            {currentStep.title}
          </p>
          <p
            className="text-xs mb-3"
            style={{
              fontFamily: 'var(--font-numbers)',
              color: 'var(--color-text)',
            }}
          >
            {currentStep.description}
          </p>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSkip}
              className="text-xs opacity-50"
              style={{
                color: 'var(--color-text)',
                fontFamily: 'var(--font-numbers)',
              }}
            >
              Skip
            </button>
            <div className="flex items-center gap-3">
              <span
                className="text-xs opacity-50"
                style={{
                  color: 'var(--color-text)',
                  fontFamily: 'var(--font-numbers)',
                }}
              >
                {stepIndex + 1} / {steps.length}
              </span>
              <button
                onClick={handleNext}
                className="text-xs px-3 py-1 rounded"
                style={{
                  backgroundColor: 'var(--color-title)',
                  color: 'var(--color-bg)',
                  fontFamily: 'var(--font-numbers)',
                }}
              >
                {isLastStep ? 'Done' : 'Next'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
