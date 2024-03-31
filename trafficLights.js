//styles.css
.container {
  justify-content: center; /* Align children vertically in the center */
  align-items: center;
  display: flex;
}

.traffic-light {
  flex-direction: column;
  margin: 0 auto;
  width: 100px;
  height: 300px;
  background-color: black;
  border-radius: 7px;
  padding: 10px;
  gap: 10px;
}

.light {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: gray;
}

/App.js
import "./styles.css";
import React from "react";
import TrafficLights from "./TrafficLights";

const trafficStates = {
  red: { backgroundcolor: "red", duration: 4000, next: "green" },
  yellow: { backgroundcolor: "yellow", duration: 500, next: "red" },
  green: { backgroundcolor: "green", duration: 3000, next: "yellow" },
};
export default function App() {
  return (
    <div className="container">
      <TrafficLights trafficStates={trafficStates} />
    </div>
  );
}

//TrafficLights.js
import React, { useState, useEffect } from "react";
import classNames from "classnames";

const TrafficLights = ({ trafficStates }) => {
  const [currentColor, setCurrentColor] = useState("green");
  useEffect(() => {
    const { duration, next } = trafficStates[currentColor];
    const timerId = setTimeout(() => {
      setCurrentColor(next);
    }, duration);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentColor]);

  return (
    <div className="traffic-light">
      {Object.keys(trafficStates).map((color) => (
        <div
          key={color}
          className={classNames("light")}
          style={{
            backgroundColor:
              color === currentColor && trafficStates[color].backgroundcolor,
          }}
        />
      ))}
    </div>
  );
};

export default TrafficLights;

