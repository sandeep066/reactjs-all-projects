import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiFetch = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Api fetch failed!!!");
        }
        const data = await response.json();
        setProducts(data.products);
        setIsLoading(false);
      } catch (error) {
        console.log("Errored apitech", error.message);
        setIsLoading(true);
      }
    };
    apiFetch();
  }, []);

  const handleCheck = (index, e) => {
    const updatedProducts = [...products];
    updatedProducts[index].id *= index;
    setProducts(updatedProducts);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      {isLoading
        ? "Loading..."
        : products.map((product, index) => {
            return (
              <div key={product.id}>
                <input
                  type="checkbox"
                  name="check"
                  onChange={() => handleCheck(index)}
                />
                {product.id} {product.brand}
              </div>
            );
          })}
    </div>
  );
}
