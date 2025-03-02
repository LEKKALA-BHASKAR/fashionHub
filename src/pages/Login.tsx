
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, User, Lock, UserCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would be an API call to verify credentials
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo purposes, we're using simple validation
      // In production, you would verify against a database/backend
      if (email && password) {
        // Store auth state in localStorage (use a proper auth system in production)
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', isAdmin ? 'admin' : 'user');
        localStorage.setItem('userEmail', email);
        
        toast({
          title: "Login successful",
          description: `Welcome back${isAdmin ? ' admin' : ''}!`,
        });
        
        // Redirect based on role
        if (isAdmin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-fashion-black p-6 text-white text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-300 mt-1">Sign in to your FashionSakhi account</p>
        </div>
        
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsAdmin(false)}
              className={`px-4 py-2 rounded-l-md border border-r-0 ${
                !isAdmin ? 'bg-fashion-black text-white' : 'bg-white text-gray-700'
              }`}
            >
              <User className="inline mr-2 h-4 w-4" />
              User Login
            </button>
            <button
              onClick={() => setIsAdmin(true)}
              className={`px-4 py-2 rounded-r-md border ${
                isAdmin ? 'bg-fashion-black text-white' : 'bg-white text-gray-700'
              }`}
            >
              <UserCheck className="inline mr-2 h-4 w-4" />
              Admin Login
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-black focus:border-transparent"
                  placeholder={isAdmin ? "admin@example.com" : "your@email.com"}
                  required
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-black focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-fashion-black hover:bg-black text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fashion-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-fashion-black hover:underline">
              Forgot your password?
            </a>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-fashion-black font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
