export default function ErrorMessage({ message }) {
  return (
    <div style={{
      background: 'rgba(227,74,74,0.1)',
      border: '0.5px solid rgba(227,74,74,0.3)',
      borderRadius: '10px',
      padding: '1.25rem',
      margin: '1.5rem 0',
      color: '#f87171',
      fontSize: '14px',
    }}>
      ⚠️ {message || 'Algo deu errado. Verifique sua API key no arquivo .env'}
    </div>
  );
}
