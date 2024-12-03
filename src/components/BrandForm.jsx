import { useState } from 'react';
import { createDocument, updateDocument } from '../utils/firebase';
import toast from 'react-hot-toast';

export default function BrandForm({ onSubmit, initialData, userId }) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [logo, setLogo] = useState(initialData?.logo || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const brandData = {
        name,
        description,
        logo,
        userId,
        createdAt: Date.now(),
      };

      if (initialData) {
        await updateDocument('brands', initialData.id, brandData);
        toast.success('Brand updated successfully');
      } else {
        await createDocument('brands', brandData);
        toast.success('Brand created successfully');
      }
      onSubmit();
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Brand Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Logo URL</label>
        <input
          type="url"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialData ? 'Update Brand' : 'Create Brand'}
      </button>
    </form>
  );
}