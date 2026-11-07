export interface PriceAlert {
  id: string;
  vehicleId: string;
  vehicleName: string;
  vehicleImage: string;
  currentPrice: number;
  targetPrice: number;
  email: string;
  notifyEmail: boolean;
  notifyToast: boolean;
  createdAt: string;
  status: 'active' | 'triggered';
}

export interface AppNotification {
  id: string;
  vehicleId: string;
  vehicleName: string;
  vehicleImage: string;
  oldPrice: number;
  newPrice: number;
  discountPercentage: number;
  type: 'price_drop' | 'new_allocation' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
