import React from 'react';
import UserForm from './components/UserForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Contact Form</h1>
      </header>
      <main>
        <UserForm />
      </main>
    </div>
  );
}

export default App;
