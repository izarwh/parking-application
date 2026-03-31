import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const defaultSlotId = searchParams.get('slotId') || '';
  const navigate = useNavigate();
  const addBooking = useStore(state => state.addBooking);
  
  const [formData, setFormData] = useState({
    name: '',
    vehicleNumber: '',
    slotId: defaultSlotId,
    duration: 60,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `BKG-${Date.now().toString().slice(-6)}`;
    
    addBooking({
      id: newId,
      name: formData.name,
      vehicleNumber: formData.vehicleNumber,
      slotId: formData.slotId,
      startTime: Date.now(),
      duration: Number(formData.duration),
      isActive: true,
    });
    
    navigate(`/booking/${newId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-8">
        <button 
          onClick={() => navigate('/')}
          className="text-slate-400 hover:text-slate-600 font-medium text-sm mb-6 flex items-center transition-colors"
        >
          ← Back to Layout
        </button>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Book a Parking Slot</h1>
        <p className="text-slate-500 text-sm mb-8">Please fill in your vehicle details below.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label-text">Slot Selection</label>
            <input 
              type="text" 
              required
              readOnly={!!defaultSlotId}
              value={formData.slotId}
              onChange={(e) => setFormData({...formData, slotId: e.target.value})}
              className={`input-field font-mono font-bold ${defaultSlotId ? 'bg-slate-100 text-slate-500' : ''}`}
              placeholder="e.g. A1"
            />
          </div>

          <div>
            <label className="label-text">Full Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="input-field" 
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="label-text">Vehicle Registration Number</label>
            <input 
              type="text" 
              required
              value={formData.vehicleNumber}
              onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value.toUpperCase()})}
              className="input-field font-mono uppercase" 
              placeholder="XYZ 1234"
            />
          </div>

          <div>
            <label className="label-text">Duration (Minutes)</label>
            <select 
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: Number(e.target.value)})}
              className="input-field bg-white"
            >
              <option value={30}>30 Minutes</option>
              <option value={60}>1 Hour</option>
              <option value={120}>2 Hours</option>
              <option value={240}>4 Hours</option>
            </select>
          </div>

          <button type="submit" className="btn-primary w-full mt-8">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};
