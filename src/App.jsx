// import React, { useState, Suspense, lazy } from "react";
// import CharApp from "./myApps/DisneyCharacter/App";
// import TicTacToe from "./myApps/MultiPlayerTicTac/Frontend";

// const components = {
//   CharApp: {
//     name: "Disney Character App",
//     path: "./myApps/DisneyCharacter/App",
//     Component: CharApp,
//   },
//   InvestmentCalc: {
//     name: "Investment Calculator",
//     path: "./myApps/InvestmentCalcApp",
//     Component: lazy(() => import("./myApps/InvestmentCalc/index")),
//   },
//   EmailBatchSender: {
//     name: "Email Batch Sender",
//     path: "./myApps/EmailBatchSender/Frontend/index",
//     Component: lazy(() => import("./myApps/EmailBatchSender/Frontend/index")),
//   },
//   TicTacToea: {
//     name: "TicTacToea",
//     path: "./myApps/MultiPlayerTicTac/Frontend/index.jsx",
//     Component: lazy(() => import("./myApps/MultiPlayerTicTac/Frontend/index.jsx")),
//   },
//   ChatApp: {
//     name: "ChatApp",
//     path: "./myApps/ChatApp/index.jsx",
//     Component: lazy(() => import("./myApps/ChatApp/index.jsx")),
//   },
//   Email: {
//     name: "Email",
//     path: "./myApps/Email/index.jsx",
//     Component: lazy(() => import("./myApps/Email/index.jsx")),
//   },
//   ReduxCounters: {
//     name: "ReduxCounters",
//     path: "./myApps/ReduxCounters/index.jsx",
//     Component: lazy(() => import("./myApps/ReduxCounters/index.jsx")),
//   },
//   GitHub:{
//     name: "GitHub",
//     path: "./myApps/github/index.jsx",
//     Component: lazy(() => import("./myApps/github/index.jsx")), 
//   }
// };

// function App() {
//   const [selectedComponent, setSelectedComponent] = useState("GitHub");

//   const handleOptionChange = (event) => {
//     setSelectedComponent(event.target.value);
//   };

//   const SelectedComponent = components[selectedComponent].Component;

//   return (
//     <div>
//       <select onChange={handleOptionChange} value={selectedComponent}>
//         {Object.keys(components).map((key) => (
//           <option key={key} value={key}>
//             {components[key].name}
//           </option>
//         ))}
//       </select>

//       <Suspense fallback={<div>Loading...</div>}>
//         <SelectedComponent />
//       </Suspense>
//     </div>
//   );
// }

// export default App;


import React from 'react'
import GitHub from './myApps/github/index.jsx';
function App() {
  return (
    <GitHub />
  )
}

export default App;
