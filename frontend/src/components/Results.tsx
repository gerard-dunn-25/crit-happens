import type { ResultsProps } from '../types'

export default function Results({ result }: ResultsProps) {
  return (
    <div className="results">
      {result && (
        <div>
          <h1>Total: {result.total}</h1>
          <p>
            {result.rolls.map((roll, index) => (
              <span key={index}>
                <span
                  className={
                    result.critical_rolls[index] ? 'critical-roll' : ''
                  }
                >
                  {roll}
                </span>
                {index < result.rolls.length - 1 && ' + '}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  )
}
