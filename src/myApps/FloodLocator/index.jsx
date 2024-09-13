import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MyLocation from './MyLocation';


import ClientPanel from './client';
import Admin from './admin';
// import Maps from './Maps';
// import Locations from './Locations.jsx';



  

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
          <Route index element={<ClientPanel />} />
          <Route path="/admin" element={<Admin />} />
          {/* <Route path="/location" element={<Locations />} /> */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;