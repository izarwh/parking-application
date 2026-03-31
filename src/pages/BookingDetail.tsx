import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const BookingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const bookings = useStore(state => state.bookings);
  const endBooking = useStore(state => state.endBooking);

  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center text-slate-500">
        <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
        <p>The requested booking ID does not exist.</p>
        <button onClick={() => navigate('/')} className="mt-8 text-blue-500 font-medium">Return Home</button>
      </div>
    );
  }

  const handleEndSession = () => {
    endBooking(booking.id);
    navigate('/');
  };

  const endTime = new Date(booking.startTime + booking.duration * 60000);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-lg p-8">
        <div className="flex justify-between items-start mb-8">
            <button 
              onClick={() => navigate('/')}
              className="text-slate-400 hover:text-slate-600 font-medium text-sm flex items-center transition-colors"
            >
              ← Dashboard
            </button>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
               {booking.isActive ? 'ACTIVE' : 'COMPLETED'}
            </span>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Booking Ticket</h1>
        <p className="font-mono text-slate-500 mb-8 border-b border-slate-200 pb-4">#{booking.id}</p>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 bg-slate-100/50 p-4 rounded-xl">
             <div>
               <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Name</p>
               <p className="text-lg font-bold text-slate-800">{booking.name}</p>
             </div>
             <div>
               <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Vehicle</p>
               <p className="text-lg font-bold text-slate-800 font-mono">{booking.vehicleNumber}</p>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4">
             <div>
               <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Slot</p>
               <p className="text-3xl font-extrabold text-blue-500">{booking.slotId}</p>
             </div>
             <div>
               <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Valid Until</p>
               <p className="text-xl font-bold text-slate-700">{endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
               <p className="text-sm font-medium text-slate-500 mt-1">{booking.duration} minutes total</p>
             </div>
          </div>
        </div>

        {booking.isActive && (
          <button 
            className="w-full mt-10 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 flex justify-center items-center gap-2"
            onClick={handleEndSession}
          >
            End Session Now
          </button>
        )}
      </div>
    </div>
  );
};
