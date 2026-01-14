import "./styles.css";
import React, { useMemo } from "react";

const a = [3, 2, "b", 7, 1];
const obj1 = { x: 4, y: 5, z: 0 };

const useDecreasingOrder = (arr, obj) => {
  const descSorted = useMemo(() => {
    const merged = [...arr, ...Object.values(obj)];

    const onlyNumbers = merged.filter((value) => {
      return Number.isFinite(value);
    });

    const sortedDesc = [...onlyNumbers].sort((a, b) => {
      return b - a;
    });

    return sortedDesc;
  }, [arr, obj]);

  return { descSorted };
};

const PrintDescOrder = ({ descSorted }) => {
  return (
    <ul>
      {descSorted.map((number, index) => {
        return <li key={index}>{number}</li>;
      })}
    </ul>
  );
};

export default function App() {
  const { descSorted } = useDecreasingOrder(a, obj1);

  return (
    <div className="App">
      <h1>Array + Object merged & sorted in descending order</h1>
      <PrintDescOrder descSorted={descSorted} />
    </div>
  );
}
