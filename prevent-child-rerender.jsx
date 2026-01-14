import React, { useState, useMemo, useCallback } from "react";

/*
  ChildComponent is wrapped with React.memo to avoid unnecessary re-renders.
  - numbers is memoized in parent using useMemo
  - onClick is a stable callback from parent
  - source is a primitive string (stable)
  - child creates its own click handler using useCallback
*/

const ChildComponent = React.memo(function ChildComponent({
  numbers,
  onClick,
  source,
}) {
  const sum = useMemo(() => {
    return numbers.reduce((total, el) => {
      return total + el;
    }, 0);
  }, [numbers]);

  console.log("ChildComponent rendered. Sum:", sum);

  const handleChildClick = useCallback(() => {
    onClick(source);
  }, [onClick, source]);

  return (
    <div>
      <ul>
        {numbers.map((num) => {
          return <li key={num}>{num}</li>;
        })}
      </ul>

      <button onClick={handleChildClick}>Child click</button>
    </div>
  );
});

export default function App() {
  const [click, setClick] = useState(0);

  const numbers = useMemo(() => {
    return [1, 2, 3, 4, 5];
  }, []);

  // ONE shared, stable callback
  const handleClick = useCallback((source) => {
    console.log(`${source} clicked`);
    setClick((prev) => {
      return prev + 1;
    });
  }, []);

  // Stable parent click handler
  const handleParentClick = useCallback(() => {
    handleClick("Parent");
  }, [handleClick]);

  return (
    <div>
      <p>Parent clicks: {click}</p>

      <button onClick={handleParentClick}>Click Parent</button>

      <ChildComponent
        numbers={numbers}
        onClick={handleClick}
        source="Child"
      />
    </div>
  );
}
