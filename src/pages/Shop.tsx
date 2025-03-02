import { useState, useEffect } from "react";
import { Search, Filter, ShoppingBag, ChevronDown, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SubscribeForm from "../components/SubscribeForm";
import ProductCard from "../components/ProductCard";

// Sample product data
const products = [
  {
    id: 1,
    name: "Classic Denim Jacket",
    category: "outerwear",
    price: 89.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    colors: ["blue", "black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isFeatured: true,
    isNew: false,
    onSale: false,
    description: "A timeless denim jacket that never goes out of style. Perfect for layering in any season."
  },
  {
    id: 2,
    name: "Floral Summer Dress",
    category: "dresses",
    price: 59.99,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    colors: ["white", "pink", "yellow"],
    sizes: ["XS", "S", "M", "L"],
    isFeatured: true,
    isNew: true,
    onSale: false,
    description: "A beautiful floral dress for warm summer days. Light and flowy material keeps you cool and stylish."
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    category: "accessories",
    price: 79.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    colors: ["brown", "black", "tan"],
    sizes: ["One Size"],
    isFeatured: false,
    isNew: false,
    onSale: true,
    originalPrice: 99.99,
    description: "A versatile leather crossbody bag with multiple compartments. Perfect for both casual and formal occasions."
  },
  {
    id: 4,
    name: "Classic White Sneakers",
    category: "footwear",
    price: 64.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    colors: ["white", "black", "gray"],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    isFeatured: true,
    isNew: false,
    onSale: false,
    description: "Clean and minimal sneakers that go with everything. Comfortable for all-day wear."
  },
  {
    id: 5,
    name: "Cashmere Sweater",
    category: "tops",
    price: 129.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1604313999393-5396088d2d97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    colors: ["cream", "navy", "burgundy"],
    sizes: ["S", "M", "L", "XL"],
    isFeatured: false,
    isNew: false,
    onSale: true,
    originalPrice: 149.99,
    description: "Luxuriously soft cashmere sweater that's both elegant and comfortable. Perfect for cooler weather."
  },
  {
    id: 6,
    name: "High-Waisted Jeans",
    category: "bottoms",
    price: 69.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    colors: ["blue", "black", "light blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isFeatured: true,
    isNew: false,
    onSale: false,
    description: "Flattering high-waisted jeans with the perfect amount of stretch. Comfortable for all-day wear."
  },
  {
    id: 7,
    name: "Statement Earrings",
    category: "accessories",
    price: 34.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    colors: ["gold", "silver"],
    sizes: ["One Size"],
    isFeatured: false,
    isNew: true,
    onSale: false,
    description: "Eye-catching statement earrings that elevate any outfit. Lightweight design for comfortable wear."
  },
  {
    id: 8,
    name: "Wide-Brim Straw Hat",
    category: "accessories",
    price: 39.99,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1582966752314-dd651072a3e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    colors: ["natural", "black"],
    sizes: ["One Size"],
    isFeatured: false,
    isNew: false,
    onSale: true,
    originalPrice: 49.99,
    description: "Stylish wide-brim straw hat for sun protection with an adjustable inner band for a perfect fit."
  },
  {
    id: 9,
    name: "Silk Blouse",
    category: "tops",
    price: 89.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1563293656-0a762ecb989f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    colors: ["white", "black", "navy", "blush"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isFeatured: true,
    isNew: true,
    onSale: false,
    description: "Elegant silk blouse with a classic design. Versatile piece that transitions seamlessly from office to evening."
  },
  {
    id: 10,
    name: "Printed Midi Skirt",
    category: "bottoms",
    price: 59.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    colors: ["multi"],
    sizes: ["XS", "S", "M", "L"],
    isFeatured: false,
    isNew: false,
    onSale: false,
    description: "Flowing midi skirt with a beautiful print. Elastic waistband for comfort and a flattering silhouette."
  },
  {
    id: 11,
    name: "Leather Ankle Boots",
    category: "footwear",
    price: 119.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    colors: ["black", "brown"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    isFeatured: true,
    isNew: false,
    onSale: false,
    description: "Classic leather ankle boots with a comfortable heel height. Durable construction for years of wear."
  },
  {
    id: 12,
    name: "Oversized Wool Coat",
    category: "outerwear",
    price: 189.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1605902711834-8b11a93eacce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    colors: ["camel", "gray", "black"],
    sizes: ["S", "M", "L", "XL"],
    isFeatured: false,
    isNew: true,
    onSale: false,
    description: "Luxurious oversized wool coat with a timeless design. Perfect for cold weather with its warm and cozy feel."
  }
];

// Categories
const categories = [
  { id: "all", name: "All Products" },
  { id: "outerwear", name: "Outerwear" },
  { id: "dresses", name: "Dresses" },
  { id: "tops", name: "Tops" },
  { id: "bottoms", name: "Bottoms" },
  { id: "accessories", name: "Accessories" },
  { id: "footwear", name: "Footwear" }
];

// Color options
const colorOptions = [
  { id: "black", name: "Black", value: "#000000" },
  { id: "white", name: "White", value: "#FFFFFF" },
  { id: "blue", name: "Blue", value: "#0066CC" },
  { id: "pink", name: "Pink", value: "#FFC0CB" },
  { id: "red", name: "Red", value: "#FF0000" },
  { id: "green", name: "Green", value: "#008000" },
  { id: "yellow", name: "Yellow", value: "#FFFF00" },
  { id: "purple", name: "Purple", value: "#800080" },
  { id: "gray", name: "Gray", value: "#808080" },
  { id: "brown", name: "Brown", value: "#A52A2A" },
  { id: "navy", name: "Navy", value: "#000080" },
  { id: "burgundy", name: "Burgundy", value: "#800020" },
  { id: "cream", name: "Cream", value: "#FFFDD0" },
  { id: "tan", name: "Tan", value: "#D2B48C" },
  { id: "gold", name: "Gold", value: "#FFD700" },
  { id: "silver", name: "Silver", value: "#C0C0C0" },
  { id: "multi", name: "Multi", value: "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)" }
];

// Size options 
const sizeOptions = [
  { id: "xs", name: "XS" },
  { id: "s", name: "S" },
  { id: "m", name: "M" },
  { id: "l", name: "L" },
  { id: "xl", name: "XL" },
  { id: "36", name: "36" },
  { id: "37", name: "37" },
  { id: "38", name: "38" },
  { id: "39", name: "39" },
  { id: "40", name: "40" },
  { id: "41", name: "41" },
  { id: "42", name: "42" },
  { id: "onesize", name: "One Size" }
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 16600]);  // Updated to INR (0-200 USD -> 0-16600 INR)
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    // Apply filters
    let result = [...products];

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Color filter
    if (selectedColors.length > 0) {
      result = result.filter(product => 
        product.colors.some(color => selectedColors.includes(color))
      );
    }

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter(product => 
        product.sizes.some(size => {
          // Normalize sizes for comparison
          const normalizedProductSize = size.toLowerCase();
          return selectedSizes.some(selectedSize => {
            const normalizedSelectedSize = selectedSize.toLowerCase();
            // Handle "One Size" case
            if (normalizedProductSize === "one size" && normalizedSelectedSize === "onesize") {
              return true;
            }
            return normalizedProductSize === normalizedSelectedSize;
          });
        })
      );
    }

    // Price range filter - convert products' USD prices to INR for comparison
    result = result.filter(product => 
      (product.price * 83) >= priceRange[0] && (product.price * 83) <= priceRange[1]
    );

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "featured":
        result = result.sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1));
        break;
      case "newest":
        result = result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case "price-low-high":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result = result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [selectedCategory, selectedColors, selectedSizes, priceRange, searchQuery, sortOption]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    window.scrollTo(0, 0);
  };

  const handleColorToggle = (colorId: string) => {
    setSelectedColors(prev => 
      prev.includes(colorId) 
        ? prev.filter(color => color !== colorId) 
        : [...prev, colorId]
    );
  };

  const handleSizeToggle = (sizeId: string) => {
    setSelectedSizes(prev => 
      prev.includes(sizeId) 
        ? prev.filter(size => size !== sizeId) 
        : [...prev, sizeId]
    );
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = Number(e.target.value);
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = value;
      return newRange;
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already applied via useEffect
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([0, 16600]);  // Updated to INR
    setSearchQuery("");
    setSortOption("featured");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Banner */}
        <section className="bg-fashion-black text-white py-12 mb-8">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h1 className="heading-xl mb-2">Shop Our Collection</h1>
                <p className="text-gray-300">Discover the latest trends and timeless classics</p>
              </div>
              <div className="mt-4 md:mt-0 max-w-md w-full">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pr-10 rounded-md border-0 focus:ring-2 focus:ring-fashion-red text-black"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Search size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <div className="container-custom">
          {/* Categories Navigation */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-2 md:space-x-4 min-w-max">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? "bg-fashion-red text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters (Mobile Toggle) */}
            <div className="md:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 rounded-md"
              >
                <span className="font-medium flex items-center">
                  <Filter size={18} className="mr-2" /> Filters
                </span>
                <ChevronDown size={18} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Filters Sidebar */}
            <aside className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-fashion-red hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <div className="flex space-x-4">
                      <input
                        type="range"
                        min="0"
                        max="16600"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-full accent-fashion-red"
                      />
                      <input
                        type="range"
                        min="0"
                        max="16600"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full accent-fashion-red"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-full p-1 text-sm border rounded"
                      />
                      <span className="text-gray-500 self-center">to</span>
                      <input
                        type="number"
                        min={priceRange[0]}
                        max="16600"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full p-1 text-sm border rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Color Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map(color => (
                      <button
                        key={color.id}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                          selectedColors.includes(color.id) 
                            ? 'border-fashion-red' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                        style={{ 
                          background: color.value,
                          boxShadow: color.id === 'white' ? 'inset 0 0 0 1px #e5e7eb' : 'none'
                        }}
                        onClick={() => handleColorToggle(color.id)}
                        title={color.name}
                      >
                        {selectedColors.includes(color.id) && (
                          <span className={`text-${color.id === 'white' || color.id === 'yellow' ? 'black' : 'white'}`}>
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map(size => (
                      <button
                        key={size.id}
                        className={`px-3 py-1 border text-sm rounded ${
                          selectedSizes.includes(size.id)
                            ? 'bg-fashion-red text-white border-fashion-red'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                        onClick={() => handleSizeToggle(size.id)}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-grow">
              {/* Sort Options */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Showing <span className="font-medium">{filteredProducts.length}</span> products
                </p>
                
                <div className="flex items-center">
                  <label htmlFor="sort" className="mr-2 text-sm text-gray-600">Sort by:</label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="text-sm border-gray-300 rounded-md focus:ring-fashion-red focus:border-fashion-red"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      image={product.image}
                      category={product.category}
                      rating={product.rating}
                      isNew={product.isNew}
                      isTrending={product.isFeatured}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mb-4">
                    <ShoppingBag size={48} className="text-gray-300 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
                  <button 
                    onClick={clearFilters}
                    className="text-fashion-red hover:underline font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <SubscribeForm />
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
