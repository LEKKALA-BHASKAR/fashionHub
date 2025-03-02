
import { useState } from "react";
import { Link } from "react-router-dom";

interface BlogPostProps {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  authorImage: string;
}

const BlogPost = ({
  id,
  title,
  excerpt,
  image,
  date,
  author,
  category,
  authorImage,
}: BlogPostProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article className="card-hover overflow-hidden rounded-lg bg-white">
      {/* Image */}
      <Link to={`/blog/${id}`} className="block overflow-hidden h-48 sm:h-56 md:h-64 relative">
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-fashion-red text-white text-xs font-medium px-2.5 py-1 rounded">
          {category}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center space-x-2 mb-3">
          <img 
            src={authorImage} 
            alt={author} 
            className="w-8 h-8 rounded-full object-cover"
            loading="lazy"
          />
          <div className="text-xs text-gray-600">
            <span>{author}</span>
            <span className="mx-1">•</span>
            <time dateTime={date}>{date}</time>
          </div>
        </div>
        <Link to={`/blog/${id}`}>
          <h3 className="text-lg font-semibold text-fashion-black mb-2 hover:text-fashion-red transition-colors duration-300 line-clamp-2">{title}</h3>
        </Link>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        <Link 
          to={`/blog/${id}`}
          className="inline-block text-fashion-red text-sm font-medium hover:underline transition-all duration-300"
        >
          Read More
        </Link>
      </div>
    </article>
  );
};

export default BlogPost;
