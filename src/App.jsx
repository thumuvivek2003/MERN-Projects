import React, { useState, Suspense, lazy } from "react";
import CharApp from "./myApps/DisneyCharacter/App";

// Define a function that dynamically imports the component
const components = {
  CharApp: {
    name: "Disney Character App",
    path: "./myApps/DisneyCharacter/App",
    Component: CharApp,
  },
  InvestmentCalc: {
    name: "Investment Calculator",
    path: "./myApps/InvestmentCalcApp",
    Component: lazy(() => import("./myApps/InvestmentCalc/index")),
  },
  EmailBatchSender: {
    name: "Email Batch Sender",
    path: "./myApps/EmailBatchSender/Frontend/index",
    Component: lazy(() => import("./myApps/EmailBatchSender/Frontend/index")),
  },
};

function App() {
  const [selectedComponent, setSelectedComponent] = useState("EmailBatchSender");

  const handleOptionChange = (event) => {
    setSelectedComponent(event.target.value);
  };

  const SelectedComponent = components[selectedComponent].Component;

  return (
    <div>
      <select onChange={handleOptionChange} value={selectedComponent}>
        {Object.keys(components).map((key) => (
          <option key={key} value={key}>
            {components[key].name}
          </option>
        ))}
      </select>

      <Suspense fallback={<div>Loading...</div>}>
        <SelectedComponent />
      </Suspense>
    </div>
  );
}

export default App;
