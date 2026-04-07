'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#dc2626' }}>Erreur Critique</h2>
          <p style={{ color: '#4b5563', marginBottom: '2rem' }}>
            L'application CampusConnect a rencontré une erreur fatale. L'équipe d'ingénierie a été notifiée automatiquement.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '0.75rem 1.5rem', background: '#059669', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Recharger l'application
          </button>
        </div>
      </body>
    </html>
  );
}
