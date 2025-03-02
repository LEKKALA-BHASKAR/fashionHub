
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, Plus, Minus, ChevronLeft, AlertTriangle } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "@/components/ui/use-toast";

const Cart = () => {
  const { state, removeFromCart, updateQuantity } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
      variant: "destructive",
    });
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
        variant: "default",
      });
      setIsCheckingOut(false);
      // Further checkout logic would go here
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="heading-xl mb-2">Your Shopping Cart</h1>
            <p className="text-gray-600">
              {state.totalItems === 0
                ? "Your cart is empty"
                : `You have ${state.totalItems} item${state.totalItems !== 1 ? "s" : ""} in your cart`}
            </p>
          </div>

          {state.items.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <div className="inline-block p-6 rounded-full bg-gray-100 mb-4">
                <ShoppingBag size={48} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added anything to your cart yet. Browse our products and find something you'll love.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-fashion-black text-white px-5 py-3 rounded-md hover:bg-opacity-90 transition-all duration-200"
              >
                <ChevronLeft size={18} />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="hidden md:grid md:grid-cols-[3fr,1fr,1fr,auto] px-6 py-4 bg-gray-50 text-sm font-medium text-gray-700">
                    <div>Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div></div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {state.items.map((item) => (
                      <div key={item.id} className="p-4 md:p-6 md:grid md:grid-cols-[3fr,1fr,1fr,auto] items-center gap-4">
                        {/* Product */}
                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                          <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1">
                              <Link to={`/product/${item.id}`} className="hover:text-fashion-red">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="md:text-center mb-4 md:mb-0">
                          <div className="md:hidden text-sm font-medium text-gray-500 mb-1">Price:</div>
                          <div className="font-medium">${item.price.toFixed(2)}</div>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center md:justify-center mb-4 md:mb-0">
                          <div className="md:hidden text-sm font-medium text-gray-500 mr-2">Quantity:</div>
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Remove */}
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-fashion-red transition-colors"
                  >
                    <ChevronLeft size={18} />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${state.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-medium">${state.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-fashion-red text-white py-3 rounded-md font-medium hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                  </button>
                  
                  <div className="mt-6 text-sm text-gray-500 flex items-start gap-2">
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                    <p>This is a demo store. No actual purchases will be made.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
