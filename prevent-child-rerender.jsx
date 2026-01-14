import React, { useState, useMemo, useCallback } from "react";

/*
  ChildComponent is wrapped with React.memo to avoid unnecessary re-renders.
  useMemo is used to keep the `numbers` array reference stable across renders.
  useCallback ensures the click handler reference does not change,
  so the child re-renders only when its actual props change.
*/

const ChildComponent = React.memo(function ChildComponent({ numbers, onClick }) {
  const sum = numbers.reduce((sum, el) => {
    return sum + el;
  }, 0);

  console.log("ChildComponent handled!!!", sum);

  return (
    <div>
      <ul>
        {numbers.map((num) => {
          return <li key={num}>{num}</li>;
        })}
      </ul>
      <button onClick={onClick}>Child click</button>
    </div>
  );
});

export default function App() {
  const [click, setClick] = useState(0);

  const numbers = useMemo(() => {
    return [1, 2, 3, 4, 5];
  }, []);

  const handleClick = useCallback(() => {
    console.log("Parent click handled !!!");
    setClick((prev) => {
      return prev + 1;
    });
  }, []);

  const handleParentClick = useCallback(() => {
    setClick((prev) => {
      return prev + 1;
    });
  }, []);

  return (
    <div>
      <button onClick={handleParentClick}>
        Click me — Parent clicks: {click}
      </button>

      <ChildComponent numbers={numbers} onClick={handleClick} />
    </div>
  );
}
