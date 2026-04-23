import { useState, useEffect } from 'react'

function App() {
  const [health, setHealth] = useState(null)
  const [dbVersion, setDbVersion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const apiBase = import.meta.env.PROD 
    ? '' 
    : 'http://localhost:4000'

  useEffect(() => {
    Promise.all([
      fetch(`${apiBase}/api/health`).then(r => r.json()),
      fetch(`${apiBase}/api/db-version`).then(r => r.json()).catch(() => null)
    ])
      .then(([healthData, dbData]) => {
        setHealth(healthData)
        setDbVersion(dbData)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="container">
      <header>
        <h1>☁️ Cloud Platform</h1>
        <p className="subtitle">Full-stack application deployed on AWS</p>
      </header>

      <main>
        <section className="card">
          <h2>Application Status</h2>
          <div className="status-item">
            <span className="label">Status:</span>
            <span className={`value ${health.status === 'ok' ? 'ok' : 'error'}`}>
              {health.status}
            </span>
          </div>
          <div className="status-item">
            <span className="label">Environment:</span>
            <span className="value">{health.environment}</span>
          </div>
          <div className="status-item">
            <span className="label">Database:</span>
            <span className={`value ${health.database === 'connected' ? 'ok' : 'error'}`}>
              {health.database}
            </span>
          </div>
        </section>

        {dbVersion && (
          <section className="card">
            <h2>Database Info</h2>
            <p className="db-version">{dbVersion.postgres}</p>
          </section>
        )}

        <section className="card">
          <h2>API Endpoints</h2>
          <ul className="endpoints">
            <li><code>GET /api/health</code> - Health check</li>
            <li><code>GET /api/hello</code> - Test endpoint</li>
            <li><code>GET /api/db-version</code> - Database version</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>Built with React + Express + PostgreSQL + AWS</p>
      </footer>
    </div>
  )
}

export default App