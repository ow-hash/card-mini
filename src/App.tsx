import { useState, useEffect } from 'react';
import './App.css';
import ProductCard from './components/ProductCard';
import type { Product } from './components/ProductCard';
import axios from 'axios';



function App() {
  const [data, setData] = useState<Product[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<Product[]>('https://api.escuelajs.co/api/v1/products');
        setData(response.data);
      } catch (e) {
          console.error("Error", e);
          setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="app-container loading-container">
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <h1>Loading products, please wait...</h1>
      </div>
    );
  }

  if (error) {
    return <div className="app-container"><h1>Error: {error}</h1></div>;
  }

  return (
    <div className="app-container">
      <h1>Product List</h1>
      <div className="card-container">
        {data.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}


export default App;