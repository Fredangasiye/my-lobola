// A very simple component for testing
function HelloWorld() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Hello World</h1>
      <p>If you can see this, the core application is working correctly.</p>
    </div>
  );
}

function App() {
  // We are temporarily replacing your entire router with this simple component
  return <HelloWorld />;
}

export default App;