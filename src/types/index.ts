export interface ParkingSlot {
  id: string;
  x: number;
  y: number;
  status: 'available' | 'occupied';
  size: 'small' | 'medium' | 'large';
}

export interface Booking {
  id: string;
  name: string;
  vehicleNumber: string;
  slotId: string;
  startTime: number;
  duration: number; // mins
  isActive: boolean;
}
