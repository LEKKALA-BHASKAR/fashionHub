
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const { state: cartState } = useCart();

  // Check auth status on component mount
  useEffect(() => {
    // This is a mock authentication check
    // In a real application, this would check a token in localStorage or a cookie
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setUserRole(user.role || "user");
    }
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    setUserRole("");
    // Redirect to home page would happen here in a real app
  };

  const toggleDropdown = (name: string) => {
    setDropdownOpen(dropdownOpen === name ? "" : name);
  };

  // Navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Customize", path: "/customize" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-fashion-black">
            FASHION
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium hover:text-fashion-red transition-colors ${
                  pathname === link.path ? "text-fashion-red" : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Navigation - Auth & Cart */}
          <div className="flex items-center">
            {/* Auth */}
            <div className="relative mr-4">
              {isAuthenticated ? (
                <div className="relative group">
                  <button
                    onClick={() => toggleDropdown("account")}
                    className="flex items-center space-x-1 text-gray-700 hover:text-fashion-red"
                  >
                    <User size={20} />
                    {!isMobile && (
                      <>
                        <span className="text-sm font-medium ml-1">Account</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${
                            dropdownOpen === "account" ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    )}
                  </button>

                  {/* Account Dropdown */}
                  <div
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 transition-all duration-200 ${
                      dropdownOpen === "account"
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                  >
                    {userRole === "admin" && (
                      <Link
                        to="/admin-dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen("")}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-700 hover:text-fashion-red"
                >
                  <User size={20} />
                  {!isMobile && (
                    <span className="text-sm font-medium ml-1">Login</span>
                  )}
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 hover:text-fashion-red">
              <ShoppingBag size={20} />
              {cartState.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-fashion-red text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {cartState.totalItems > 9 ? '9+' : cartState.totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="ml-4 md:hidden text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="pt-4 pb-2 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block py-2 text-base font-medium hover:text-fashion-red transition-colors ${
                  pathname === link.path ? "text-fashion-red" : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
