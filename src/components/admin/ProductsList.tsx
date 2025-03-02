
import React, { useState } from "react";
import { Shirt, Edit, Trash2, ArrowUpDown, Check, X, PackageOpen } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

interface ProductsListProps {
  products: Product[];
  handleDeleteProduct: (id: number) => void;
  handleUpdateProduct?: (product: Product) => void;
}

const ProductsList = ({ products, handleDeleteProduct, handleUpdateProduct }: ProductsListProps) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editedValues, setEditedValues] = useState<Partial<Product>>({});
  const [sortField, setSortField] = useState<keyof Product>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setEditedValues({ ...product });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditedValues({});
  };

  const handleSaveEdit = () => {
    if (editingProduct && handleUpdateProduct && editedValues) {
      handleUpdateProduct({ ...editingProduct, ...editedValues });
      setEditingProduct(null);
      setEditedValues({});
    }
  };

  const handleInputChange = (field: keyof Product, value: string | number) => {
    setEditedValues({ ...editedValues, [field]: value });
  };

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortDirection === "asc" 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }

    return sortDirection === "asc" 
      ? Number(valueA) - Number(valueB) 
      : Number(valueB) - Number(valueA);
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div 
                className="flex items-center cursor-pointer" 
                onClick={() => handleSort("name")}
              >
                Product 
                <ArrowUpDown className={`ml-1 h-4 w-4 ${sortField === "name" ? "text-fashion-black" : ""}`} />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("category")}
              >
                Category 
                <ArrowUpDown className={`ml-1 h-4 w-4 ${sortField === "category" ? "text-fashion-black" : ""}`} />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Price 
                <ArrowUpDown className={`ml-1 h-4 w-4 ${sortField === "price" ? "text-fashion-black" : ""}`} />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("stock")}
              >
                Stock 
                <ArrowUpDown className={`ml-1 h-4 w-4 ${sortField === "stock" ? "text-fashion-black" : ""}`} />
              </div>
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedProducts.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <PackageOpen className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    {editingProduct?.id === product.id ? (
                      <input
                        type="text"
                        value={editedValues.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-fashion-black"
                      />
                    ) : (
                      <>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingProduct?.id === product.id ? (
                  <select
                    value={editedValues.category || ""}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-fashion-black"
                  >
                    <option value="tops">Tops</option>
                    <option value="dresses">Dresses</option>
                    <option value="bottoms">Bottoms</option>
                    <option value="outerwear">Outerwear</option>
                    <option value="shoes">Shoes</option>
                    <option value="accessories">Accessories</option>
                    <option value="bags">Bags</option>
                  </select>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {product.category}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingProduct?.id === product.id ? (
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                    <input
                      type="number"
                      value={editedValues.price || 0}
                      onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
                      className="w-full pl-6 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-fashion-black"
                    />
                  </div>
                ) : (
                  <div className="text-sm text-gray-900">₹{product.price.toFixed(0)}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingProduct?.id === product.id ? (
                  <input
                    type="number"
                    value={editedValues.stock || 0}
                    onChange={(e) => handleInputChange("stock", parseInt(e.target.value))}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-fashion-black"
                  />
                ) : (
                  <div className={`text-sm ${product.stock < 5 ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                    {product.stock} {product.stock === 1 ? 'unit' : 'units'}
                    {product.stock < 5 && <span className="ml-1 text-xs">(Low stock)</span>}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {editingProduct?.id === product.id ? (
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={handleSaveEdit}
                      className="text-green-600 hover:text-green-800 transition-colors duration-200"
                      title="Save changes"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={handleCancelEdit}
                      className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                      title="Cancel editing"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800 mx-2 transition-colors duration-200"
                      title="Edit product"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-800 mx-2 transition-colors duration-200"
                      title="Delete product"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <PackageOpen className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No products found. Try a different search or add a new product.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
