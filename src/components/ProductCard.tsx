import { useState } from 'react';



export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const imageUrl = product.images && product.images.length > 0 && product.images[0] ? product.images[0] : 'https://placehold.co/600x400';

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const descriptionToShow = product.description.length > 30 && !isExpanded ? `${product.description.substring(0, 30)}...` : product.description;

  return (
    <div className="card">
      <img src={imageUrl} alt={product.title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{product.title}</h2>
        <p className="card-price">${product.price.toLocaleString()}</p>
        <p className="card-category">Category: {product.category.name}</p>
        <p className="card-description">{descriptionToShow}</p>
        {product.description.length > 30 && (
          <button onClick={toggleReadMore} className="read-more-button">
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>
    </div>
  );
}



export default ProductCard;