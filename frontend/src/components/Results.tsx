import type { ResultsProps } from '../types'

export default function Results({ result }: ResultsProps) {
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {result && (
        <>
          <h2
            className="text-4xl font-bold text-[var(--color-title)] tracking-widest"
            style={{ fontFamily: 'var(--font-numbers)' }}
          >
            {result.total}
          </h2>
          <p className="text-2xl text-[var(--color-text)] font-bold opacity-70">
            {result.rolls.map((roll, index) => (
              <span key={index}>
                <span
                  className={
                    result.critical_rolls[index]
                      ? 'text-[var(--color-crit)]'
                      : ''
                  }
                >
                  {roll}
                </span>
                {index < result.rolls.length - 1 && ' + '}
              </span>
            ))}
          </p>
        </>
      )}
    </div>
  )
}
