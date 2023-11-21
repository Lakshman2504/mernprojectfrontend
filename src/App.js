import './App.css';
import React from 'react';
import LoginPage from './components/loginpage';
import QuestionForm from './components/QuestionForm';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'; 
import LogoutSuccess from './components/LogoutSuccess';
import {Component} from 'react';
class App extends Component{
  

render() {
  const headerStyle = {
    fontSize: '20px',
    color: '#fff',
    
  };

  const buttonStyle = {
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'flex-end', // Adjusted to 'flex-end'
    padding: '10px',
    background: 'red',
    maxWidth: '100%', // Limiting the maximum width to the screen width
  };
  

  

  return (
    <div className="App">
      <Router>
        <header className="App-header" style={headerStyle}>
          <h1>Welcome to Your Quiz App</h1>
          <Link to="/logout-success" style={buttonStyle}>
            Logout
          </Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/logout-success" element={<LogoutSuccess />} />
          </Routes>
        </main>
      </Router>
      

    </div>
    
  );
  
}
}
export default App;
