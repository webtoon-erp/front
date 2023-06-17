import React from 'react';
import './App.css';
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/common/home';
import Login from './pages/common/login';
import Profile from './pages/common/profile';
import Notice from './pages/common/notice';

function App() {
  return (
    <>
    <Router>
      <header>

      </header>
      <aside>

      </aside>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <footer>
        
      </footer>
    </Router>
    </>
  );
}

export default App;
