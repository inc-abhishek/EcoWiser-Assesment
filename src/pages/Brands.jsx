import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getUserDocuments, deleteDocument } from '../utils/firebase';
import BrandForm from '../components/BrandForm';
import toast from 'react-hot-toast';

export default function Brands() {
  const { user } = useAuth();
  const [brands, setBrands] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const fetchBrands = async () => {
    if (user) {
      const userBrands = await getUserDocuments('brands', user.uid);
      setBrands(userBrands);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteDocument('brands', id);
      toast.success('Brand deleted successfully');
      fetchBrands();
    } catch (error) {
      toast.error('Failed to delete brand');
    }
  };

  const handleEdit = (brand) => {
    setSelectedBrand(brand);
    setShowForm(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Brands</h1>
        <button
          onClick={() => {
            setSelectedBrand(null);
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Brand
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {selectedBrand ? 'Edit Brand' : 'Add New Brand'}
            </h2>
            <BrandForm
              onSubmit={() => {
                setShowForm(false);
                fetchBrands();
              }}
              initialData={selectedBrand}
              userId={user.uid}
            />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 w-12 object-contain"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(brand)}
                  className="p-1 text-gray-500 hover:text-indigo-600"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(brand.id)}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900">{brand.name}</h3>
            <p className="mt-2 text-sm text-gray-500">{brand.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}