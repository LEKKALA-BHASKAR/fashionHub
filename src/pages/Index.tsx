
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OfferSlider from "../components/OfferSlider";
import ProductCard from "../components/ProductCard";
import BlogPost from "../components/BlogPost";
import SubscribeForm from "../components/SubscribeForm";

// Sample data
const newArrivals = [
  {
    id: 1,
    name: "Cotton Blend Casual Shirt",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=1471",
    category: "men's clothing",
    rating: 4.5,
    isNew: true,
  },
  {
    id: 2,
    name: "Summer Floral Dress",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&q=80&w=1480",
    category: "women's clothing",
    rating: 4.7,
    isNew: true,
  },
  {
    id: 3,
    name: "Classic Fitted Denim Jeans",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=1480",
    category: "men's clothing",
    rating: 4.2,
    isNew: true,
  },
  {
    id: 4,
    name: "Minimalist Silver Watch",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?auto=format&fit=crop&q=80&w=1480",
    category: "accessories",
    rating: 4.8,
    isNew: true,
  },
];

const trendingProducts = [
  {
    id: 5,
    name: "Premium Leather Jacket",
    price: 249.99,
    originalPrice: 299.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1470",
    category: "men's clothing",
    rating: 4.9,
    isTrending: true,
  },
  {
    id: 6,
    name: "Designer Handbag",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1335",
    category: "accessories",
    rating: 4.7,
    isTrending: true,
  },
  {
    id: 7,
    name: "Athletic Running Shoes",
    price: 119.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=1374",
    category: "footwear",
    rating: 4.6,
    isTrending: true,
  },
  {
    id: 8,
    name: "Slim Fit Formal Shirt",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&q=80&w=1374",
    category: "men's clothing",
    rating: 4.4,
    isTrending: true,
  },
];

const customizedProducts = [
  {
    id: 9,
    name: "Custom Embroidered Tee",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1364",
    category: "custom clothing",
    rating: 4.8,
  },
  {
    id: 10,
    name: "Personalized Denim Jacket",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=1374",
    category: "custom clothing",
    rating: 4.9,
  },
  {
    id: 11,
    name: "Custom Printed Sneakers",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&q=80&w=1480",
    category: "custom footwear",
    rating: 4.7,
  },
  {
    id: 12,
    name: "Monogrammed Leather Wallet",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1374",
    category: "custom accessories",
    rating: 4.5,
  },
];

const blogPosts = [
  {
    id: 1,
    title: "Summer Fashion Trends to Watch Out For",
    excerpt: "Discover the hottest summer fashion trends that will dominate this season. From vibrant colors to minimalist designs, here's everything you need to know.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1470",
    date: "June 12, 2023",
    author: "Emma Johnson",
    category: "Trends",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1374",
  },
  {
    id: 2,
    title: "Sustainable Fashion: Making Ethical Choices",
    excerpt: "Learn how to make more sustainable fashion choices and support ethical brands that are making a difference in the industry.",
    image: "https://images.unsplash.com/photo-1610395219791-21fe191fe28d?auto=format&fit=crop&q=80&w=1470",
    date: "May 28, 2023",
    author: "Michael Chen",
    category: "Sustainability",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1374",
  },
  {
    id: 3,
    title: "How to Style Accessories for Any Occasion",
    excerpt: "Accessories can make or break your outfit. Here's your guide to selecting and styling the perfect accessories for any event.",
    image: "https://images.unsplash.com/photo-1509631179407-329d2a2a9905?auto=format&fit=crop&q=80&w=1376",
    date: "April 15, 2023",
    author: "Sophia Martinez",
    category: "Styling",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1470",
  },
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section with offer slider */}
        <section className="pt-24">
          <OfferSlider />
        </section>

        {/* New Arrivals Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="mb-10 flex justify-between items-center">
              <div>
                <span className="uppercase text-fashion-red text-sm font-semibold tracking-wider">Fresh & New</span>
                <h2 className="heading-lg mt-1">New Arrivals</h2>
              </div>
              <Link to="/shop?category=new" className="flex items-center text-fashion-black hover:text-fashion-red transition-colors duration-300">
                <span className="mr-2 font-medium">View All</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {newArrivals.map((product) => (
                <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${product.id * 0.1}s` }}>
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="mb-10 flex justify-between items-center">
              <div>
                <span className="uppercase text-fashion-red text-sm font-semibold tracking-wider">Popular Items</span>
                <h2 className="heading-lg mt-1">Trending Products</h2>
              </div>
              <Link to="/shop?category=trending" className="flex items-center text-fashion-black hover:text-fashion-red transition-colors duration-300">
                <span className="mr-2 font-medium">View All</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {trendingProducts.map((product) => (
                <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${(product.id - 4) * 0.1}s` }}>
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Banner Section */}
        <section className="py-16 bg-fashion-black text-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-center md:text-left animate-fade-in-up">
                <span className="uppercase text-fashion-red text-sm font-semibold tracking-wider">Express Yourself</span>
                <h2 className="heading-lg">Create Your Unique Style</h2>
                <p className="text-gray-400 text-lg">
                  Customize your fashion items with our bespoke design service. 
                  Stand out from the crowd with personalized clothing that reflects your unique style.
                </p>
                <Link to="/customize" className="btn-primary inline-block">
                  Start Customizing
                </Link>
              </div>
              
              <div className="relative overflow-hidden rounded-lg animate-slide-in-right">
                <img 
                  src="https://images.unsplash.com/photo-1513094735237-8f2714d57c13?auto=format&fit=crop&q=80&w=1470" 
                  alt="Customize your fashion" 
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Customized Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="mb-10 flex justify-between items-center">
              <div>
                <span className="uppercase text-fashion-red text-sm font-semibold tracking-wider">Personalized Fashion</span>
                <h2 className="heading-lg mt-1">Customized Products</h2>
              </div>
              <Link to="/customize" className="flex items-center text-fashion-black hover:text-fashion-red transition-colors duration-300">
                <span className="mr-2 font-medium">Customize Yours</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {customizedProducts.map((product) => (
                <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${(product.id - 8) * 0.1}s` }}>
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="mb-10 flex justify-between items-center">
              <div>
                <span className="uppercase text-fashion-red text-sm font-semibold tracking-wider">Blog</span>
                <h2 className="heading-lg mt-1">Posts from FashionHub</h2>
              </div>
              <a href="#" className="flex items-center text-fashion-black hover:text-fashion-red transition-colors duration-300">
                <span className="mr-2 font-medium">View All Posts</span>
                <ArrowRight size={16} />
              </a>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.map((post, index) => (
                <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <BlogPost {...post} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <SubscribeForm />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
