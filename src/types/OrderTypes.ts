export interface Order {
  id: number;
  phone: string;
  customer: string;
  status: 'delivered' | 'pending' | 'processing' | 'cancelled';
  priority: boolean;
  cart: CartItem[];
  orderPrice: number;
  priorityPrice: number;
  estimatedDelivery: number;
}

export interface NewOrder {
  phone: string;
  customer: string;
  address: string;
  priority: boolean;
  cart: CartItem[];
}

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  addIngredients?: string[];
  removeIngredients?: string[];
}
