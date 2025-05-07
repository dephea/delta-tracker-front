import './App.css'
import {MemoryRouter, Route, Routes} from "react-router-dom";
import HomePage from './Pages/Home';
import LoginPage from './Pages/Login';
import Register from './Pages/Register';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <>
    <MemoryRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
    </>
  )
}

export default App
