
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Import our newly created components
import Sidebar from "@/components/admin/Sidebar";
import SearchBar from "@/components/admin/SearchBar";
import ProductsList from "@/components/admin/ProductsList";
import AddProductForm from "@/components/admin/AddProductForm";
import OrdersList from "@/components/admin/OrdersList";
import CustomersPlaceholder from "@/components/admin/CustomersPlaceholder";

// Mock data for products
const initialProducts = [
  { 
    id: 1, 
    name: "Floral Summer Dress", 
    category: "dresses", 
    price: 4979, 
    stock: 15,
    image: "https://images.unsplash.com/photo-1550639525-c97d455acf70?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
  },
  { 
    id: 2, 
    name: "Classic Black Heels", 
    category: "shoes", 
    price: 7469, 
    stock: 8,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
  },
  { 
    id: 3, 
    name: "Leather Tote Bag", 
    category: "bags", 
    price: 10789, 
    stock: 12,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
  },
];

// Mock data for orders
const initialOrders = [
  {
    id: 1001,
    customer: "Emma Johnson",
    date: "2023-05-15",
    status: "delivered" as const,
    total: 12448,
    items: 2
  },
  {
    id: 1002,
    customer: "John Smith",
    date: "2023-05-16",
    status: "processing" as const,
    total: 7469,
    items: 1
  },
  {
    id: 1003,
    customer: "Sophia Williams",
    date: "2023-05-14",
    status: "shipped" as const,
    total: 18257,
    items: 3
  },
];

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
};

type Order = {
  id: number;
  customer: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: number;
};

// Mock site settings
const initialSettings = {
  siteName: "FashionSakhi",
  logo: "",
  primaryColor: "#171717",
  accentColor: "#ef4444",
  allowGuestCheckout: true,
  currencySymbol: "₹",
  shippingThreshold: 2499,
  freeShippingEnabled: true,
  maintenanceMode: false,
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [settings, setSettings] = useState(initialSettings);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    image: "",
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is admin (in a real app, this would be verified with a backend)
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (isAuthenticated !== 'true' || userRole !== 'admin') {
      toast({
        title: "Access denied",
        description: "You do not have permission to access this page.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate, toast]);
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate('/login');
  };
  
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
      toast({
        title: "Validation error",
        description: "Please fill all required fields with valid values.",
        variant: "destructive",
      });
      return;
    }
    
    const productId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    setProducts([...products, { id: productId, ...newProduct }]);
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      image: "",
    });
    setIsAddingProduct(false);
    
    toast({
      title: "Product added",
      description: `${newProduct.name} has been added to your inventory.`,
    });
  };
  
  const handleDeleteProduct = (id: number) => {
    const productToDelete = products.find(p => p.id === id);
    
    setProducts(products.filter(product => product.id !== id));
    
    toast({
      title: "Product deleted",
      description: `${productToDelete?.name} has been removed from your inventory.`,
    });
  };
  
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    
    toast({
      title: "Product updated",
      description: `${updatedProduct.name} has been updated successfully.`,
    });
  };
  
  const handleUpdateOrderStatus = (id: number, newStatus: Order["status"]) => {
    setOrders(
      orders.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    
    toast({
      title: "Order updated",
      description: `Order #${id} status changed to ${newStatus}.`,
    });
  };
  
  const handleUpdateSettings = (updatedSettings: typeof initialSettings) => {
    setSettings(updatedSettings);
    
    toast({
      title: "Settings updated",
      description: "Site settings have been updated successfully.",
    });
  };
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredOrders = orders.filter(order => 
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toString().includes(searchQuery)
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout} 
      />
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {activeTab === "products" && "Manage Products"}
                {activeTab === "orders" && "Manage Orders"}
                {activeTab === "customers" && "Manage Customers"}
                {activeTab === "settings" && "Site Settings"}
              </h1>
              <p className="text-gray-600">
                {activeTab === "products" && "Add, edit or remove products from your inventory"}
                {activeTab === "orders" && "View and manage customer orders"}
                {activeTab === "customers" && "View and manage customer accounts"}
                {activeTab === "settings" && "Configure website appearance and functionality"}
              </p>
            </div>
            
            {activeTab === "products" && !isAddingProduct && (
              <button
                onClick={() => setIsAddingProduct(true)}
                className="bg-fashion-black text-white px-4 py-2 rounded-md flex items-center"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Product
              </button>
            )}
          </div>
          
          {/* Search bar Component (not for settings tab) */}
          {activeTab !== "settings" && (
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              placeholder={`Search ${activeTab}...`}
            />
          )}
          
          {/* Products tab */}
          {activeTab === "products" && !isAddingProduct && (
            <ProductsList 
              products={filteredProducts} 
              handleDeleteProduct={handleDeleteProduct}
              handleUpdateProduct={handleUpdateProduct}
            />
          )}
          
          {/* Add product form Component */}
          {activeTab === "products" && isAddingProduct && (
            <AddProductForm 
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              handleAddProduct={handleAddProduct}
              setIsAddingProduct={setIsAddingProduct}
            />
          )}
          
          {/* Orders tab Component */}
          {activeTab === "orders" && (
            <OrdersList 
              orders={filteredOrders} 
              handleUpdateOrderStatus={handleUpdateOrderStatus} 
            />
          )}
          
          {/* Customers tab Component */}
          {activeTab === "customers" && <CustomersPlaceholder />}
          
          {/* Settings tab Component */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-lg shadow p-6">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-black focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      value={settings.logo}
                      onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-black focus:border-transparent"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Color
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                        className="h-10 w-10 border-0 p-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                        className="ml-2 flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-black focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Accent Color
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={settings.accentColor}
                        onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                        className="h-10 w-10 border-0 p-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.accentColor}
                        onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                        className="ml-2 flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-black focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Currency Symbol
                    </label>
                    <input
                      type="text"
                      value={settings.currencySymbol}
                      onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-black focus:border-transparent"
                      maxLength={1}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Free Shipping Threshold (₹)
                    </label>
                    <input
                      type="number"
                      value={settings.shippingThreshold}
                      onChange={(e) => setSettings({ ...settings, shippingThreshold: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-black focus:border-transparent"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.allowGuestCheckout}
                        onChange={(e) => setSettings({ ...settings, allowGuestCheckout: e.target.checked })}
                        className="h-4 w-4 text-fashion-black focus:ring-fashion-black border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Allow Guest Checkout</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.freeShippingEnabled}
                        onChange={(e) => setSettings({ ...settings, freeShippingEnabled: e.target.checked })}
                        className="h-4 w-4 text-fashion-black focus:ring-fashion-black border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Enable Free Shipping</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.maintenanceMode}
                        onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                        className="h-4 w-4 text-fashion-black focus:ring-fashion-black border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Maintenance Mode</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => setSettings(initialSettings)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateSettings(settings)}
                    className="bg-fashion-black text-white px-6 py-2 rounded-md"
                  >
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
