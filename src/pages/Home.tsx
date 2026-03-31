import React from 'react';
import { ParkingLayout } from '../components/ParkingLayout';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
   const bookings = useStore(state => state.bookings);
   const activeBookingsCount = bookings.filter(b => b.isActive).length;

   return (
     <div className="min-h-screen bg-slate-50 px-4 py-8 md:p-12 font-sans flex justify-center selection:bg-blue-100">
       <div className="w-full max-w-4xl">
         <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
           <div>
             <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">SmartPark.</h1>
             <p className="text-slate-500 mt-2 font-medium">Select a colored slot below to begin booking</p>
           </div>
           
           <div className="flex gap-3">
             <div className="glass-panel px-4 py-2 flex items-center gap-3">
               <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
               <span className="font-semibold text-slate-700 text-sm">
                 {activeBookingsCount} Active Bookings
               </span>
             </div>
           </div>
         </header>

         {/* legend */}
         <div className="flex items-center gap-6 mt-4 opacity-90 text-sm font-medium">
             <div className="flex items-center gap-2">
                 <div className="w-4 h-4 rounded-md bg-emerald-500 shadow-sm shadow-emerald-500/30"></div>
                 <span className="text-slate-600">Available</span>
             </div>
             <div className="flex items-center gap-2">
                 <div className="w-4 h-4 rounded-md bg-red-500 shadow-sm shadow-red-500/30"></div>
                 <span className="text-slate-600">Occupied</span>
             </div>
         </div>

         <main>
           <ParkingLayout />
         </main>
         
         <footer className="mt-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {bookings.filter(b => b.isActive).slice(0, 4).map(booking => (
                  <Link 
                     key={booking.id} 
                     to={`/booking/${booking.id}`}
                     className="glass-panel p-4 hover:border-blue-300 transition-colors flex justify-between items-center group"
                  >
                     <div>
                        <p className="font-bold text-slate-800">{booking.vehicleNumber}</p>
                        <p className="text-xs text-slate-500">Slot {booking.slotId}</p>
                     </div>
                     <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
               ))}
               {activeBookingsCount === 0 && (
                  <div className="col-span-1 sm:col-span-2 p-6 rounded-xl border border-dashed border-slate-300 text-center text-slate-400 font-medium">
                     No active bookings available
                  </div>
               )}
            </div>
         </footer>
       </div>
     </div>
   );
};
