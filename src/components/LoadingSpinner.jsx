export default function LoadingSpinner({ text = 'Carregando...' }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(74,222,128,0.2)',
        borderTop: '3px solid #4ade80',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        margin: '0 auto 1rem',
      }} />
      <p style={{ color: '#888', fontSize: '14px' }}>{text}</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
