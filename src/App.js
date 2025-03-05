import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Home from './components/Home.jsx';
import PrinterDetails from './components/PrinterDetails.jsx';
import ConsumableDetails from './components/consumables-details.jsx';
import QuoteRequest from './components/QuoteRequest.jsx';
import QuoteView from './components/QuoteView.jsx';
import QuoteViewVendors from './components/QuoteViewVendors.jsx';
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
