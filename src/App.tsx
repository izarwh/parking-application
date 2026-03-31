import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { BookingPage } from './pages/Booking';
import { BookingDetail } from './pages/BookingDetail';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking/:id" element={<BookingDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
