
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Star } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { toast } from "@/components/ui/use-toast";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
  isTrending?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating,
  isNew = false,
  isTrending = false,
}: ProductProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    
    addToCart({
      id,
      name,
      price,
      image,
      category,
    });
    
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
      variant: "default",
    });
  };

  return (
    <div 
      className="group relative card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link to={`/product/${id}`} className="block overflow-hidden rounded-lg bg-gray-100 aspect-[3/4]">
        <div className="relative w-full h-full">
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>
        
        {/* Labels */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="bg-fashion-black text-white text-xs font-medium px-2.5 py-1 rounded">
              NEW
            </span>
          )}
          {isTrending && (
            <span className="bg-fashion-red text-white text-xs font-medium px-2.5 py-1 rounded">
              TRENDING
            </span>
          )}
          {discount > 0 && (
            <span className="bg-green-600 text-white text-xs font-medium px-2.5 py-1 rounded">
              {discount}% OFF
            </span>
          )}
        </div>
        
        {/* Quick add button */}
        <div className={`absolute bottom-0 left-0 right-0 bg-fashion-black bg-opacity-90 text-white py-3 text-center text-sm font-medium transition-all duration-300 transform ${
          isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}>
          <button 
            className="flex items-center justify-center w-full space-x-2"
            onClick={handleQuickAdd}
          >
            <ShoppingBag size={16} />
            <span>Quick Add</span>
          </button>
        </div>
      </Link>

      {/* Product info */}
      <div className="mt-3 space-y-1">
        <div className="flex justify-between items-start">
          <Link to={`/product/${id}`} className="block">
            <h3 className="text-sm font-medium text-gray-900 hover:text-fashion-red transition-colors duration-300 line-clamp-1">{name}</h3>
          </Link>
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs ml-1 text-gray-600">{rating}</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 capitalize">{category}</p>
        
        <div className="flex items-center">
          <span className="font-medium text-fashion-black">₹{(price * 83).toFixed(0)}</span>
          {originalPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">₹{(originalPrice * 83).toFixed(0)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
