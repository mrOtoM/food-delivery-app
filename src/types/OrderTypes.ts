export interface Order {
  id: string;
  phone: string;
  customer: string;
  status: 'delivered' | 'pending' | 'processing' | 'cancelled';
  priority: boolean;
  cart: CartItem[];
  orderPrice: number;
  priorityPrice: number;
}

export interface CartItem {
  name: string;
  id: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  addIngredients: string[];
  removeIngredients: string[];
}
