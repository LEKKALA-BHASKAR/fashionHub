
import { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SubscribeForm from "../components/SubscribeForm";

// Sample team data
const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Founder & Creative Director",
    bio: "With over 15 years in the fashion industry, Sarah founded FashionSakhi with a vision to combine timeless elegance with modern trends.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1374",
    social: {
      instagram: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Head of Design",
    bio: "Michael brings his unique perspective and innovative approach to every collection, drawing inspiration from global fashion movements.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1374",
    social: {
      instagram: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Marketing Director",
    bio: "Priya's strategic vision has been instrumental in building the FashionSakhi brand and connecting with our global community of customers.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1364",
    social: {
      instagram: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Production Manager",
    bio: "James oversees our sustainable production processes, ensuring ethical practices and quality craftsmanship in every piece we create.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1374",
    social: {
      instagram: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 5,
    name: "Olivia Martinez",
    role: "Customer Experience Lead",
    bio: "Olivia is dedicated to creating exceptional experiences for our customers, from personalized styling to post-purchase support.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1470",
    social: {
      instagram: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 6,
    name: "David Kim",
    role: "E-Commerce Director",
    bio: "David leads our digital strategy, creating seamless online shopping experiences and innovative ways to connect with our community.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1374",
    social: {
      instagram: "#",
      twitter: "#",
      linkedin: "#"
    }
  }
];

// Milestones data
const milestones = [
  {
    year: 2012,
    title: "The Beginning",
    description: "FashionSakhi was founded with a small collection of handcrafted designs in a tiny studio."
  },
  {
    year: 2014,
    title: "First Flagship Store",
    description: "We opened our first physical location in downtown New York, bringing our vision to life."
  },
  {
    year: 2016,
    title: "International Expansion",
    description: "FashionSakhi expanded to Europe and Asia, introducing our brand to a global audience."
  },
  {
    year: 2018,
    title: "Sustainability Initiative",
    description: "We launched our comprehensive sustainability program, committing to ethical fashion practices."
  },
  {
    year: 2020,
    title: "Digital Transformation",
    description: "Our enhanced online platform was launched, creating an immersive shopping experience."
  },
  {
    year: 2022,
    title: "Community Focus",
    description: "We introduced the FashionSakhi Foundation to support emerging designers and fashion education."
  }
];

// Values data
const values = [
  {
    title: "Quality",
    description: "We believe in creating garments that stand the test of time, using the finest materials and craftsmanship.",
    icon: "✨"
  },
  {
    title: "Sustainability",
    description: "Our commitment to environmental responsibility guides every decision we make, from sourcing to production.",
    icon: "🌱"
  },
  {
    title: "Inclusivity",
    description: "We design for everyone, celebrating diversity and creating fashion that makes people feel confident.",
    icon: "👐"
  },
  {
    title: "Innovation",
    description: "We continuously push boundaries and explore new techniques to evolve and enhance the fashion experience.",
    icon: "💡"
  }
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative">
          <div className="bg-fashion-black h-96 md:h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1374" 
                alt="FashionSakhi Team" 
                className="w-full h-full object-cover opacity-30"
              />
            </div>
            <div className="container-custom text-center relative z-10">
              <h1 className="heading-xl text-white mb-4">About FashionSakhi</h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Crafting fashion that empowers and inspires. Our journey, our story, our passion.
              </p>
            </div>
          </div>
        </section>

        {/* About FashionSakhi Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <span className="uppercase text-fashion-red text-sm font-semibold tracking-wider">Our Story</span>
                <h2 className="heading-lg mt-1 mb-6">About FashionSakhi</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Founded in 2012, FashionSakhi began as a small passion project with a big vision - to create clothing that combines timeless elegance with contemporary trends, while respecting the planet and the people who make our garments.
                  </p>
                  <p>
                    What started as a collection of handcrafted designs in a tiny studio has grown into a global brand that stays true to its founding principles. Through every step of our growth, we've remained committed to quality, sustainability, and empowering our customers through fashion.
                  </p>
                  <p>
                    Today, FashionSakhi is more than just a fashion brand - it's a community of like-minded individuals who believe in the power of self-expression through clothing. Our designs continue to evolve, but our core values remain unchanged.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 animate-fade-in-up delay-200">
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1470" 
                    alt="Fashion design" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-lg mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1491897554428-130a60dd4757?auto=format&fit=crop&q=80&w=1480" 
                    alt="Fabric design" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=1411" 
                    alt="Clothing rack" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-lg mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1470" 
                    alt="Fashion workspace" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="uppercase text-fashion-red text-sm font-semibold tracking-wider">Our Journey</span>
              <h2 className="heading-lg mt-1 mb-4">FashionSakhi Through the Years</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore the key moments in our journey from a small design studio to a global fashion brand
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
              
              <div className="space-y-12 relative">
                {milestones.map((milestone, index) => (
                  <div 
                    key={milestone.year} 
                    className={`flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } animate-fade-in-up`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className={`md:w-1/2 text-right ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:text-left'} pr-12`}>
                      <div className="mb-1 inline-block px-3 py-1 bg-fashion-red text-white text-sm font-semibold rounded-full">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                    
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                      <div className="w-6 h-6 rounded-full bg-fashion-red border-4 border-white shadow"></div>
                    </div>
                    
                    <div className="md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Motive Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="uppercase text-fashion-red text-sm font-semibold tracking-wider">Our Purpose</span>
              <h2 className="heading-lg mt-1 mb-6">Our Motive</h2>
              <p className="text-gray-600">
                At FashionSakhi, we're driven by more than just creating beautiful clothing. Our mission is to empower individuals through fashion that's consciously created, timeless in design, and accessible to all.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg animate-fade-in-up">
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-gray-700 mb-6">
                  To create fashion that transcends trends, empowers self-expression, and respects both people and planet throughout the creation process.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-fashion-red mr-2">✓</span>
                    <span>Design clothing that is both beautiful and functional</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-fashion-red mr-2">✓</span>
                    <span>Use sustainable materials and ethical production methods</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-fashion-red mr-2">✓</span>
                    <span>Create inclusive fashion for diverse body types and styles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-fashion-red mr-2">✓</span>
                    <span>Build a community connected by shared values and fashion appreciation</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg animate-fade-in-up delay-100">
                <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                <p className="text-gray-700 mb-6">
                  We envision a world where fashion is a force for good - where style and sustainability coexist, and where clothing empowers people to express their authentic selves.
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-fashion-red mr-2">✓</span>
                    <span>Pioneer innovative approaches to sustainable fashion</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-fashion-red mr-2">✓</span>
                    <span>Inspire industry-wide change in production practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-fashion-red mr-2">✓</span>
                    <span>Create a global community united by conscious fashion choices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-fashion-red mr-2">✓</span>
                    <span>Support the next generation of ethical fashion designers</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-16">
              <div className="text-center mb-10">
                <h3 className="text-xl font-semibold mb-2">Our Core Values</h3>
                <p className="text-gray-600">The principles that guide every decision we make</p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div 
                    key={value.title} 
                    className="text-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="uppercase text-fashion-red text-sm font-semibold tracking-wider">Our People</span>
              <h2 className="heading-lg mt-1 mb-4">Meet the Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The passionate individuals behind FashionSakhi who bring creativity, expertise, and dedication to everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={member.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-fashion-red mb-3">{member.role}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex space-x-3">
                      <a href={member.social.instagram} className="text-gray-400 hover:text-fashion-red transition-colors">
                        <Instagram size={18} />
                      </a>
                      <a href={member.social.twitter} className="text-gray-400 hover:text-fashion-red transition-colors">
                        <Twitter size={18} />
                      </a>
                      <a href={member.social.linkedin} className="text-gray-400 hover:text-fashion-red transition-colors">
                        <Linkedin size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="mb-6 text-gray-600">Interested in joining our team?</p>
              <a href="/careers" className="btn-secondary">
                View Career Opportunities
              </a>
            </div>
          </div>
        </section>

        {/* Testimonial Highlight */}
        <section className="py-16 bg-fashion-black text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-light mb-8 italic">
                "FashionSakhi isn't just about clothing - it's about creating a community that celebrates individuality, sustainability, and the transformative power of fashion."
              </h2>
              <div>
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-sm text-gray-400">Founder & Creative Director</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="bg-gray-50 rounded-xl p-8 md:p-12 text-center">
              <h2 className="heading-md mb-4">Join the FashionSakhi Journey</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Be part of our story as we continue to innovate and inspire through fashion. Connect with us on social media and sign up for our newsletter to stay updated.
              </p>
              <div className="flex justify-center space-x-4 mb-8">
                <a href="#" className="w-10 h-10 rounded-full bg-fashion-red text-white flex items-center justify-center hover:bg-opacity-90 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-fashion-red text-white flex items-center justify-center hover:bg-opacity-90 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-fashion-red text-white flex items-center justify-center hover:bg-opacity-90 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-fashion-red text-white flex items-center justify-center hover:bg-opacity-90 transition-colors">
                  <Mail size={20} />
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/shop" className="btn-primary">
                  Shop Our Collection
                </a>
                <a href="/contact" className="btn-secondary">
                  Contact Us
                </a>
              </div>
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

export default About;
