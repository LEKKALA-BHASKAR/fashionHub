
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  bgColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Summer Collection",
    description: "Discover our latest summer styles with up to 30% off",
    ctaText: "Shop Now",
    ctaLink: "/shop?category=summer",
    image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&q=80&w=1374",
    bgColor: "bg-gradient-to-r from-pink-50 to-red-50",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Be the first to explore our fresh collection",
    ctaText: "Explore",
    ctaLink: "/shop?category=new",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1470",
    bgColor: "bg-gradient-to-r from-gray-50 to-gray-100",
  },
  {
    id: 3,
    title: "Exclusive Offers",
    description: "Limited time deals on premium fashion items",
    ctaText: "View Offers",
    ctaLink: "/shop?category=offers",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1470",
    bgColor: "bg-gradient-to-r from-slate-50 to-blue-50",
  },
];

const OfferSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideTimeout = useRef<number | null>(null);

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    
    setIsAnimating(true);
    setCurrentSlide(index);
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    // Auto slide
    slideTimeout.current = window.setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (slideTimeout.current) {
        clearTimeout(slideTimeout.current);
      }
    };
  }, [currentSlide]);

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 flex items-center transition-all duration-500 ease-in-out ${
            index === currentSlide
              ? "opacity-100 z-10 translate-x-0"
              : index < currentSlide || (currentSlide === 0 && index === slides.length - 1)
              ? "opacity-0 -translate-x-full z-0"
              : "opacity-0 translate-x-full z-0"
          } ${slide.bgColor}`}
        >
          <div className="container-custom flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 space-y-4 md:space-y-6 md:pr-12 text-center md:text-left z-10 mb-8 md:mb-0">
              <h2 className="heading-xl">{slide.title}</h2>
              <p className="text-lg md:text-xl text-gray-600">{slide.description}</p>
              <a 
                href={slide.ctaLink}
                className="btn-primary inline-block"
              >
                {slide.ctaText}
              </a>
            </div>
            <div className="md:w-1/2 overflow-hidden rounded-lg">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-80 md:h-[500px] object-cover object-center transform transition-transform duration-700 ease-in-out hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-fashion-black hover:bg-white transition-all duration-300 focus:outline-none"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ArrowLeft size={20} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-fashion-black hover:bg-white transition-all duration-300 focus:outline-none"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ArrowRight size={20} />
      </button>

      {/* Dots navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
              index === currentSlide ? "bg-fashion-red w-8" : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OfferSlider;
