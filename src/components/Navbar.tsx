import { LogOut, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Shopify</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            {user ? (
              <>
                <Link to="/brands" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
                  Brands
                </Link>
                <Link to="/products" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
                  Products
                </Link>
                <button
                  onClick={() => auth.signOut()}
                  className="ml-4 flex items-center text-gray-700 hover:text-indigo-600"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}