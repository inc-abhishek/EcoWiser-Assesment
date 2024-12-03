import { ShoppingBag, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Welcome to Shopify
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Manage your brands and products all in one place
        </p>
      </div>

      {user ? (
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <Link
            to="/brands"
            className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div>
              <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white">
                <ShoppingBag className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <span className="absolute inset-0" aria-hidden="true" />
                Manage Brands
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Create, edit, and manage your brand portfolio
              </p>
            </div>
          </Link>

          <Link
            to="/products"
            className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div>
              <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white">
                <Package className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <span className="absolute inset-0" aria-hidden="true" />
                Manage Products
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Add, update, and organize your product catalog
              </p>
            </div>
          </Link>
        </div>
      ) : (
        <div className="mt-12 text-center">
          <Link
            to="/login"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
}