'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''

  // Log the error to the console so it will be forwarded to server logs and captured by auto-fix
  console.error(error)

  return (
        <div className="error-container">
          <div className="error-header">
            <div className="error-icon">!</div>
            <div>
              <p className="error-message">
                An application error has occurred while loading{' '}
                <code>{pathname || '/'}</code>
              </p>
            </div>
          </div>
          <div className="error-summary">
            {error.message || 'Unknown error'}
          </div>
          {error.stack && (
            <div className="error-details-wrapper">
              <details className="error-details">
                <summary>
                  <span className="chevron">▼</span>
                  View full error trace
                </summary>
                <div className="error-stack-slot">
                  <pre className="error-stack">{error.stack}</pre>
                </div>
              </details>
            </div>
          )}
          {/* Nút reset (tùy chọn) để người dùng có thể thử tải lại */}
          <button 
            onClick={() => reset()} 
            style={{ marginTop: '1rem', marginLeft: '2rem', padding: '8px 16px', cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
  )
}