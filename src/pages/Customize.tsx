
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Calendar, Clock, MessageSquare, User, Users, Star, Image, Send } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SubscribeForm from "../components/SubscribeForm";

// Sample data for designers
const designers = [
  {
    id: 1,
    name: "Emma Johnson",
    specialty: "Women's Fashion",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1374",
    availability: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: 2,
    name: "Michael Chen",
    specialty: "Streetwear & Urban",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1374",
    availability: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    specialty: "Accessories & Jewelry",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1470",
    availability: ["Monday", "Thursday", "Friday"],
  },
];

// Sample data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Jessica Williams",
    location: "New York, NY",
    rating: 5,
    comment: "I absolutely love my customized jacket! The design team helped me create something unique that fits my style perfectly.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1364",
    productImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1470",
  },
  {
    id: 2,
    name: "David Thompson",
    location: "Los Angeles, CA",
    rating: 5,
    comment: "The custom sneakers I designed with FashionHub are incredible. The quality is amazing and I get compliments everywhere I go.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1374",
    productImage: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&q=80&w=1480",
  },
  {
    id: 3,
    name: "Aisha Patel",
    location: "Chicago, IL",
    rating: 4,
    comment: "Working with the team to create my custom dress was such a fun experience. The result exceeded my expectations.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1374",
    productImage: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&q=80&w=1480",
  },
];

// Sample data for customized products gallery
const customizedProducts = [
  {
    id: 1,
    name: "Custom Embroidered Denim Jacket",
    customer: "Alex M.",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=1374",
  },
  {
    id: 2,
    name: "Personalized Summer Dress",
    customer: "Sophia L.",
    image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&q=80&w=1480",
  },
  {
    id: 3,
    name: "Monogrammed Leather Wallet",
    customer: "James K.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1374",
  },
  {
    id: 4,
    name: "Hand-Painted Canvas Shoes",
    customer: "Mia H.",
    image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&q=80&w=1480",
  },
  {
    id: 5,
    name: "Custom Graphic T-Shirt",
    customer: "Noah P.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1364",
  },
  {
    id: 6,
    name: "Tailored Suit with Signature Lining",
    customer: "Oliver R.",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=1480",
  },
];

// Sample data for chat messages
const initialMessages = [
  {
    id: 1,
    sender: "system",
    text: "Welcome to FashionHub's design chat! How can we help you today?",
    time: "Just now",
  }
];

const Customize = () => {
  const [selectedDesigner, setSelectedDesigner] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [chatMessages, setChatMessages] = useState(initialMessages);
  const [chatInput, setChatInput] = useState("");
  const [activeTab, setActiveTab] = useState("schedule"); // "schedule" or "chat"
  const [isSubmitting, setIsSubmitting] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Scroll to bottom of chat when new messages are added
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const handleDesignerSelect = (id: number) => {
    setSelectedDesigner(id);
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDesigner) {
      toast.error("Please select a designer");
      return;
    }
    
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }
    
    if (!selectedTime) {
      toast.error("Please select a time");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your appointment has been scheduled! We'll send you a confirmation email shortly.");
      
      // Reset form
      setSelectedDate("");
      setSelectedTime("");
      setBookingNotes("");
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!chatInput.trim()) return;
    
    // Add user message
    const userMessage = {
      id: chatMessages.length + 1,
      sender: "user",
      text: chatInput,
      time: "Just now",
    };
    
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    
    // Simulate team response after a delay
    setTimeout(() => {
      const teamResponse = {
        id: chatMessages.length + 2,
        sender: "team",
        text: "Thanks for your message! One of our design team members will respond shortly. In the meantime, feel free to browse our customization options.",
        time: "Just now",
      };
      
      setChatMessages((prev) => [...prev, teamResponse]);
    }, 1000);
  };

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour <= 18; hour++) {
      const time = `${hour}:00`;
      const time12h = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
      slots.push({ value: time, label: time12h });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-fashion-black text-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-xl mb-4">Customize Your Style</h1>
              <p className="text-lg text-gray-300 mb-8">
                Create unique fashion pieces that reflect your personality and style.
                Work with our expert designers to bring your vision to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#schedule" className="btn-primary">
                  Schedule a Consultation
                </a>
                <a href="#chat" className="btn-secondary bg-transparent text-white border-white hover:bg-white hover:text-fashion-black">
                  Chat with Our Team
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Our Customization Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From concept to creation, we'll guide you through every step of designing your unique fashion item
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center text-fashion-red text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Consultation</h3>
                <p className="text-gray-600">
                  Meet with our designers to discuss your vision and ideas
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center text-fashion-red text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Design</h3>
                <p className="text-gray-600">
                  Our team creates detailed sketches and digital mockups
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center text-fashion-red text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Creation</h3>
                <p className="text-gray-600">
                  Expert craftspeople bring your design to life with precision
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center text-fashion-red text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-2">Delivery</h3>
                <p className="text-gray-600">
                  Receive your one-of-a-kind custom fashion piece
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule a Meeting / Chat with Team */}
        <section id="schedule" className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="flex border-b border-gray-200 mb-8">
                <button
                  className={`py-4 px-6 font-medium text-lg ${
                    activeTab === "schedule"
                      ? "border-b-2 border-fashion-red text-fashion-black"
                      : "text-gray-500 hover:text-fashion-black"
                  }`}
                  onClick={() => setActiveTab("schedule")}
                >
                  <Calendar className="inline-block mr-2" size={18} />
                  Schedule a Meeting
                </button>
                <button
                  id="chat"
                  className={`py-4 px-6 font-medium text-lg ${
                    activeTab === "chat"
                      ? "border-b-2 border-fashion-red text-fashion-black"
                      : "text-gray-500 hover:text-fashion-black"
                  }`}
                  onClick={() => setActiveTab("chat")}
                >
                  <MessageSquare className="inline-block mr-2" size={18} />
                  Chat with Our Team
                </button>
              </div>
              
              {activeTab === "schedule" ? (
                <div className="animate-fade-in">
                  <div className="text-center mb-8">
                    <h2 className="heading-md mb-3">Meet with a Fashion Designer</h2>
                    <p className="text-gray-600">
                      Schedule a one-on-one consultation with one of our expert designers to discuss your customization ideas
                    </p>
                  </div>
                  
                  <form onSubmit={handleBookAppointment} className="space-y-8">
                    {/* Designer Selection */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Choose a Designer</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {designers.map((designer) => (
                          <div
                            key={designer.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                              selectedDesigner === designer.id
                                ? "border-fashion-red bg-red-50"
                                : "border-gray-200"
                            }`}
                            onClick={() => handleDesignerSelect(designer.id)}
                          >
                            <div className="flex items-center mb-3">
                              <img
                                src={designer.image}
                                alt={designer.name}
                                className="w-12 h-12 rounded-full object-cover mr-3"
                              />
                              <div>
                                <h4 className="font-medium">{designer.name}</h4>
                                <p className="text-sm text-gray-600">{designer.specialty}</p>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">
                              <p>Available:</p>
                              <p className="font-medium">{designer.availability.join(", ")}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Date and Time Selection */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="appointment-date" className="block text-sm font-medium text-gray-700 mb-1">
                          Select Date <span className="text-fashion-red">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="date"
                            id="appointment-date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-red"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="appointment-time" className="block text-sm font-medium text-gray-700 mb-1">
                          Select Time <span className="text-fashion-red">*</span>
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <select
                            id="appointment-time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-red appearance-none"
                            required
                          >
                            <option value="">Select a time slot</option>
                            {timeSlots.map((slot) => (
                              <option key={slot.value} value={slot.value}>
                                {slot.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Notes */}
                    <div>
                      <label htmlFor="booking-notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Notes for the Designer (Optional)
                      </label>
                      <textarea
                        id="booking-notes"
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        rows={4}
                        placeholder="Share any specific ideas or questions you have about your customization project"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fashion-red"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full md:w-auto"
                    >
                      {isSubmitting ? "Scheduling..." : "Book Appointment"}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <div className="text-center mb-8">
                    <h2 className="heading-md mb-3">Chat with Our Design Team</h2>
                    <p className="text-gray-600">
                      Have questions about customization options? Chat with our team to get quick answers
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {/* Chat Messages */}
                    <div className="h-96 overflow-y-auto p-4 bg-gray-50">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`mb-4 flex ${
                            message.sender === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          {message.sender !== "user" && message.sender !== "system" && (
                            <div className="w-8 h-8 rounded-full bg-fashion-red text-white flex items-center justify-center mr-2 flex-shrink-0">
                              <Users size={16} />
                            </div>
                          )}
                          
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              message.sender === "user"
                                ? "bg-fashion-red text-white"
                                : message.sender === "system"
                                ? "bg-gray-200 text-gray-800"
                                : "bg-white border border-gray-200 text-gray-800"
                            }`}
                          >
                            <p>{message.text}</p>
                            <span className="text-xs opacity-70 mt-1 block">
                              {message.time}
                            </span>
                          </div>
                          
                          {message.sender === "user" && (
                            <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center ml-2 flex-shrink-0">
                              <User size={16} />
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                    
                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 flex">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type your message here..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-fashion-red"
                      />
                      <button
                        type="submit"
                        className="bg-fashion-red text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors duration-300 flex items-center"
                      >
                        <Send size={18} />
                      </button>
                    </form>
                  </div>
                  
                  <div className="mt-6 bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
                    <p>
                      <strong>Note:</strong> Our team is available for chat Monday through Friday, 9:00 AM - 6:00 PM EST.
                      For urgent matters outside these hours, please email us at{" "}
                      <a href="mailto:design@fashionhub.com" className="text-fashion-red hover:underline">
                        design@fashionhub.com
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Our Happy Customers */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="uppercase text-fashion-red text-sm font-semibold tracking-wider">Testimonials</span>
              <h2 className="heading-lg mt-1 mb-4">Our Happy Customers</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See what our customers are saying about their customization experience and the unique pieces we've created for them
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={`${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 mb-4">"{testimonial.comment}"</p>
                    
                    <div className="mt-4 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={testimonial.productImage}
                        alt="Customized product"
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <a href="#" className="btn-secondary">
                View More Testimonials
              </a>
            </div>
          </div>
        </section>

        {/* Customized Products by Customers */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="uppercase text-fashion-red text-sm font-semibold tracking-wider">Inspiration</span>
              <h2 className="heading-lg mt-1 mb-4">Customized Products Gallery</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse through our gallery of custom-designed pieces created for our clients
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {customizedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-lg animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm opacity-90">Designed for {product.customer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <a href="#" className="btn-primary">
                <Image className="inline-block mr-2" size={18} />
                View Full Gallery
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-fashion-red text-white">
          <div className="container-custom text-center">
            <h2 className="heading-lg mb-6">Ready to Create Your Custom Design?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Get started with our customization service today and bring your unique fashion vision to life
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#schedule" className="btn-primary bg-white text-fashion-red hover:bg-gray-100">
                Schedule a Consultation
              </a>
              <a href="#" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-fashion-red">
                Browse Customization Options
              </a>
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

export default Customize;
