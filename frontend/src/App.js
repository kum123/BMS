import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import "./stylesheets/alignments.css"
import "./stylesheets/custom.css"
import "./stylesheets/form-elements.css"
import "./stylesheets/sizes.css"
import "./stylesheets/theme.css"
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Profile from './pages/Profile';
import TheatersForMovie from './pages/TheatersForMovie';
import BookShow from './pages/BookShow';

function App() {
  return (
    <div className="App">
      <p>BMS Application</p>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/movie/:id" element={<ProtectedRoute><TheatersForMovie /></ProtectedRoute>} />
          <Route path="/book-show/:showId" element={<ProtectedRoute><BookShow /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
