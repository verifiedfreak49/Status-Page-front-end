import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicStatusPage from './pages/PublicStatusPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'
import AdminRegister from './pages/AdminRegister';
function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicStatusPage/>}/>
        <Route path="/login" element={<AdminLogin/>}/>
        <Route path="/register" element={<AdminRegister/>}/>
        <Route 
          path="/admin"
          element={
          <ProtectedRoute>
            <AdminDashboard/>
          </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App;