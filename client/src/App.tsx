// This is the simplest possible React component.
function App() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        padding: '40px',
        textAlign: 'center',
        border: '2px solid #ccc',
        borderRadius: '8px',
        backgroundColor: 'white'
      }}>
        <h1 style={{ fontSize: '2em', marginBottom: '16px' }}>Diagnostic Test: SUCCESS</h1>
        <p style={{ fontSize: '1.2em', color: '#333' }}>
          If you can see this on your live Vercel URL, it proves the build system is working perfectly.
        </p>
        <p style={{ marginTop: '16px', color: '#555' }}>
          The crash is happening in one of the providers or page components.
        </p>
      </div>
    </div>
  );
}

export default App;