
import React from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

interface AddProductFormProps {
  newProduct: Omit<Product, "id">;
  setNewProduct: React.Dispatch<React.SetStateAction<Omit<Product, "id">>>;
  handleAddProduct: (e: React.FormEvent) => void;
  setIsAddingProduct: (value: boolean) => void;
}

const AddProductForm = ({ 
  newProduct, 
  setNewProduct, 
  handleAddProduct, 
  setIsAddingProduct 
}: AddProductFormProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>
        <button
          onClick={() => setIsAddingProduct(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
      
      <form onSubmit={handleAddProduct}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-black focus:border-transparent"
              placeholder="Classic White T-Shirt"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-black focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              <option value="tops">Tops</option>
              <option value="dresses">Dresses</option>
              <option value="bottoms">Bottoms</option>
              <option value="outerwear">Outerwear</option>
              <option value="shoes">Shoes</option>
              <option value="accessories">Accessories</option>
              <option value="bags">Bags</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
              <input
                id="price"
                type="number"
                min="0.01"
                step="0.01"
                value={newProduct.price || ''}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-black focus:border-transparent"
                placeholder="2999"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              id="stock"
              type="number"
              min="0"
              value={newProduct.stock || ''}
              onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-black focus:border-transparent"
              placeholder="20"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              id="image"
              type="url"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-black focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">Enter a valid URL for the product image</p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsAddingProduct(false)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-fashion-black text-white px-6 py-2 rounded-md"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
