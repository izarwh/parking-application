import type { Booking } from '../types';

const STORAGE_KEY = 'parking_bookings_v1';

export const storage = {
  getBookings: (): Booking[] => {
    try {
      if (typeof window === 'undefined') return [];
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Failed to parse bookings from localStorage', error);
      return [];
    }
  },

  saveBooking: (booking: Booking): void => {
    try {
      const current = storage.getBookings();
      current.push(booking);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch (error) {
      console.error('Failed to save booking to localStorage', error);
    }
  },

  updateBooking: (booking: Booking): void => {
    try {
      const current = storage.getBookings();
      const index = current.findIndex(b => b.id === booking.id);
      if (index !== -1) {
        current[index] = booking;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      }
    } catch (error) {
      console.error('Failed to update booking in localStorage', error);
    }
  },

  endBooking: (id: string): void => {
    try {
      const current = storage.getBookings();
      const index = current.findIndex(b => b.id === id);
      if (index !== -1) {
        current[index].isActive = false;
        // slot freed in store
        localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      }
    } catch (error) {
      console.error('Failed to end booking in localStorage', error);
    }
  }
};
