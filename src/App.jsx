import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Brands from './pages/Brands';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/login" element={<AuthForm />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/brands"
              element={
                <ProtectedRoute>
                  <Brands />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;