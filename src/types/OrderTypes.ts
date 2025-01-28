export interface Order {
  id?: string;
  customer?: string;
  status?: 'delivered' | 'pending' | 'processing' | 'cancelled';
  priority: boolean;
  cart: CartItem[];
  orderPrice?: number;
  priorityPrice?: number;
}

export interface CartItem {
  name: string;
  pizzaId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  addIngredients: string[];
  removeIngredients: string[];
}
