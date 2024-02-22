import "./styles.css";
import React, { useState, useEffect } from "react";
//https://dummyjson.com/products

const useFetchApi = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiFetch = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) {
          throw new Error("Api fetch failed!!!");
        }
        const data = await res.json();
        setProducts(data.products);
        setIsLoading(false);
      } catch (error) {
        console.log("Error happened", error);
        setError(error);
      }
    };
    apiFetch();
  }, []);

  return { isLoading, products, error };
};
export default function App() {
  const { isLoading, products, error } = useFetchApi();
  console.log("PMR", products);
  // alert(isLoading);
  if (error) {
    return (
      <div className="App">
        <h1>Error occurred!</h1>
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <div className="App">
      <h1>Products dummyjson api !!!</h1>
      {isLoading
        ? "Loading..."
        : products
            .filter((product) =>
              product.images.some((url) => url.includes("4.jpg"))
            )
            .map((product) => {
              return <div key={product.id}>{product.brand}</div>;
            })}
    </div>
  );
}
