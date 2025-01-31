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
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Pripravený na objednávku? Poďme na to!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Meno</label>
          <div className="grow">
            <input className="input w-full" type="text" name="customer" required />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Telefónne číslo</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Adresa</label>
          <div className="grow">
            <input className="input w-full" type="text" name="address" required />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-x-5">
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

