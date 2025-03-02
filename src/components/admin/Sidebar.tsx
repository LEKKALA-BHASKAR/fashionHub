
import React from "react";
import { Package, Users, ShoppingBag, LogOut, Settings } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

const Sidebar = ({ activeTab, setActiveTab, handleLogout }: SidebarProps) => {
  return (
    <div className="w-64 bg-fashion-black text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold">FashionSakhi Admin</h1>
      </div>
      
      <nav className="flex-1 px-2 py-4">
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center px-4 py-3 w-full rounded-md mb-2 ${
            activeTab === "products" ? "bg-white/10" : "hover:bg-white/5"
          }`}
        >
          <Package className="mr-3 h-5 w-5" />
          <span>Products</span>
        </button>
        
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center px-4 py-3 w-full rounded-md mb-2 ${
            activeTab === "orders" ? "bg-white/10" : "hover:bg-white/5"
          }`}
        >
          <ShoppingBag className="mr-3 h-5 w-5" />
          <span>Orders</span>
        </button>
        
        <button
          onClick={() => setActiveTab("customers")}
          className={`flex items-center px-4 py-3 w-full rounded-md mb-2 ${
            activeTab === "customers" ? "bg-white/10" : "hover:bg-white/5"
          }`}
        >
          <Users className="mr-3 h-5 w-5" />
          <span>Customers</span>
        </button>
        
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center px-4 py-3 w-full rounded-md mb-2 ${
            activeTab === "settings" ? "bg-white/10" : "hover:bg-white/5"
          }`}
        >
          <Settings className="mr-3 h-5 w-5" />
          <span>Site Settings</span>
        </button>
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 w-full rounded-md hover:bg-white/5"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
