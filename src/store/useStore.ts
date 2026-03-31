import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ParkingSlot, Booking } from '../types';
import { storage } from '../utils/storage';

interface StoreState {
  parkingSlots: ParkingSlot[];
  bookings: Booking[];
  setParkingSlots: (slots: ParkingSlot[]) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (booking: Booking) => void;
  endBooking: (id: string) => void;
  syncFromStorage: () => void;
}

const DEFAULT_SLOTS: ParkingSlot[] = [
  ...Array.from({ length: 5 }).map((_, i) => ({ id: `A${i+1}`, x: 50, y: 50 + (i * 80), status: 'available' as const, size: 'small' as const })),
  ...Array.from({ length: 5 }).map((_, i) => ({ id: `B${i+1}`, x: 180, y: 50 + (i * 80), status: 'available' as const, size: 'medium' as const })),
  ...Array.from({ length: 5 }).map((_, i) => ({ id: `C${i+1}`, x: 310, y: 50 + (i * 80), status: 'available' as const, size: 'large' as const })),
];

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      parkingSlots: DEFAULT_SLOTS,
      bookings: storage.getBookings(), // load from storage

      setParkingSlots: (slots) => set({ parkingSlots: slots }),
      
      addBooking: (booking) => {
        storage.saveBooking(booking);
        set((state) => ({ 
          bookings: [...state.bookings, booking],
          parkingSlots: state.parkingSlots.map(slot => 
            slot.id === booking.slotId ? { ...slot, status: 'occupied' } : slot
          )
        }));
      },

      updateBooking: (booking) => {
        storage.updateBooking(booking);
        set((state) => ({
          bookings: state.bookings.map((b) => (b.id === booking.id ? booking : b)),
        }));
      },

      endBooking: (id) => {
        storage.endBooking(id);
        const booking = get().bookings.find(b => b.id === id);
        
        set((state) => ({
          bookings: state.bookings.map((b) => 
            b.id === id ? { ...b, isActive: false } : b
          ),
          // free slot
          ...(booking && {
             parkingSlots: state.parkingSlots.map(slot => 
                slot.id === booking.slotId ? { ...slot, status: 'available' } : slot
             )
          })
        }));
      },
      
      syncFromStorage: () => {
         set({ bookings: storage.getBookings() });
      }
    }),
    {
      name: 'parking-app-canvas-storage',
      partialize: (state) => ({ parkingSlots: state.parkingSlots }),
    }
  )
);
