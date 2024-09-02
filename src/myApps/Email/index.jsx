import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BatchDetails from './pages/BatchDetails';
import SendEmail from './pages/SendEmail';
import './index.css'
// import "bootstrap/dist/css/bootstrap.min.css";  
// import 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/batch/:batchName" element={<BatchDetails />} />
                <Route path="/send-email/:batchName" element={<SendEmail />} />
            </Routes>
        </Router>
    );
}

export default App;
