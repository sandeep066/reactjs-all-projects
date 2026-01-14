import React, { useState, useMemo, useCallback } from "react";

/*
  This app demonstrates how to prevent unnecessary child re-renders in React
  using React.memo, useMemo, and a single shared click handler.
  It identifies whether the Parent or Child triggered an action without using inline functions.
*/


const ChildComponent = React.memo(function ChildComponent({ numbers, onClick }) {
  console.log("ChildComponent rendered");

  return (
    <div>
      <ul>
        {numbers.map((num) => {
          return <li key={num}>{num}</li>;
        })}
      </ul>

      {/* SAME handler, NO inline */}
      <button data-source="Child" onClick={onClick}>
        Child click
      </button>
    </div>
  );
});

export default function App() {
  const [click, setClick] = useState(0);

  const numbers = useMemo(() => {
    return [1, 2, 3, 4, 5];
  }, []);

  // ONE shared handler
  const handleClick = useCallback((event) => {
    const source = event.currentTarget.dataset.source;

    console.log(`${source} clicked`);

    setClick((prev) => {
      return prev + 1;
    });
  }, []);

  return (
    <div>
      <p>Parent clicks: {click}</p>

      {/* Parent */}
      <button data-source="Parent" onClick={handleClick}>
        Parent click
      </button>

      {/* Child */}
      <ChildComponent numbers={numbers} onClick={handleClick} />
    </div>
  );
}
