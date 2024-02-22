import "./styles.css";
import React, { useEffect, useState } from "react";
const a = [3, 2, 7, 1];
const obj1 = { x: 4, y: 5, z: 0 };

const useDecreasingOrder = (arr, obj) => {
  const [descSorted, setDescSorted] = useState([]);

  useEffect(() => {
    const combinedArray = [...arr, ...Object.values(obj)];
    combinedArray.sort((x, y) => y - x);
    setDescSorted(combinedArray);
  }, []);

  return { descSorted };
};

const PrintDescOrder = ({ descSorted }) => {
  return (
    <ul>
      {descSorted.map((number) => {
        return <li> {number} </li>;
      })}
    </ul>
  );
};
export default function App() {
  const { descSorted } = useDecreasingOrder(a, obj1);
  return (
    <div className="App">
      <h1>Take arary and bject,merged adn printed in desending order !!!!</h1>
      <PrintDescOrder descSorted={descSorted} />
    </div>
  );
}
