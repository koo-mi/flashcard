import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-3xl">Remember Me</h1>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<p>Test</p>} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;