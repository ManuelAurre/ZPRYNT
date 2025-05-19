import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './ventanas/Login.jsx';
import Register from './ventanas/Register.jsx';
import Home from './ventanas/Home.jsx';
import PrinterDetails from './ventanas/PrinterDetails.jsx';
import ConsumableDetails from './ventanas/consumables-details.jsx';
import QuoteRequest from './ventanas/QuoteRequest.jsx';
import QuoteView from './ventanas/QuoteView.jsx';
import QuoteViewVendors from './ventanas/QuoteViewVendors.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/printer-details" element={<PrinterDetails />} />
        <Route path="/consumables-details" element={<ConsumableDetails />} />
        <Route path="/quote-request" element={<QuoteRequest />} />
        <Route path="/quote-view" element={<QuoteView />} />
        <Route path="/quote-view-vendors" element={<QuoteViewVendors />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
