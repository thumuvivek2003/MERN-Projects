import React, { useState, Suspense, lazy } from "react";
import ThemeSelect from "./myApps/ThemeSelect/ThemeSelect.jsx";

const components = {
  CharApp: {
    name: "Disney Character App",
    Component: lazy(() => import("./myApps/DisneyCharacter/App")),
  },
  InvestmentCalc: {
    name: "Investment Calculator",
    Component: lazy(() => import("./myApps/InvestmentCalc/index")),
  },
  EmailBatchSender: {
    name: "Email Batch Sender",
    Component: lazy(() => import("./myApps/EmailBatchSender/Frontend/index")),
  },
  TicTacToea: {
    name: "TicTacToea",
    Component: lazy(() => import("./myApps/MultiPlayerTicTac/Frontend/index.jsx")),
  },
  ChatApp: {
    name: "ChatApp",
    Component: lazy(() => import("./myApps/ChatApp/index.jsx")),
  },
  Email: {
    name: "Email",
    Component: lazy(() => import("./myApps/Email/index.jsx")),
  },
  ReduxCounters: {
    name: "ReduxCounters",
    Component: lazy(() => import("./myApps/ReduxCounters/index.jsx")),
  },
  GitHub:{
    name: "GitHub",
    Component: lazy(() => import("./myApps/github/index.jsx")), 
  },
  Whatsapp:{
    name: "Whatsapp",
    Component: lazy(() => import("./myApps/Whatsapp/index.jsx")), 
  },
  fileUploader:{
    name:"fileUploader",
    Component: lazy(() => import("./myApps/fileUploader/index.jsx")), 
  },
  Bible:{
    name:"Bible",
    Component: lazy(() => import("./myApps/Bible/index.jsx")), 
  },
  ThemeSelect:{
    name:"ThemeSelect",
    Component: lazy(() => import("./myApps/ThemeSelect/index.jsx")), 
  },
  
};

function App() {
  const [selectedComponent, setSelectedComponent] = useState("ThemeSelect");

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


// import React from 'react'
// import GitHub from './myApps/github/index.jsx';
// function App() {
//   return (
//     <GitHub />
//   )
// }

// export default App;
