import { Form, redirect, ActionFunctionArgs, useNavigation, useActionData } from 'react-router-dom';

import { createOrder } from '@/services/apiData';
import { CartItem, Order } from '@/types/OrderTypes';
import Button from '@/ui/Button';

const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Polo pizza',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetarianska pizza',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  const formErrors = useActionData();

  const isSubmitting = navigation.state === 'submitting';
  const cart = fakeCart;

  return (
    <div>
      <h2>Pripravený na objednávku? Poďme na to!</h2>

      <Form method="POST">
        <div>
          <label>Meno</label>
          <input className="input" type="text" name="customer" required />
        </div>

        <div>
          <label>Telefónne číslo</label>
          <div>
            <input className="input" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Adresa</label>
          <div>
            <input className="input" type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
          />
          <label htmlFor="priority">Chcete dať svojej objednávke prioritu?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting}>
            {isSubmitting ? 'Zadavam objednavku' : 'Objednať teraz'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as Order;

  const order = {
    ...data,
    phone: data.phone ?? '',
    cart: JSON.parse(data.cart as string) ?? [],
    priority: data.priority === 'on',
  };

  const newOrder = await createOrder(order);

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Prosim, zadajte Vase spravne aktualne telefonne cislo';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;

