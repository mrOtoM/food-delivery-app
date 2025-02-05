import { Form, redirect, ActionFunctionArgs, useNavigation, useActionData } from 'react-router-dom';
import { useState } from 'react';

import { createOrder } from '@/services/apiData';
import Button from '@/ui/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart, getCart, getTotalCartPrice } from '@/features/cart/cartSlice';
import EmptyCart from '@/features/cart/EmptyCart';
import { fetchAddress } from '@/features/user/userSlice';
import store from '@/store/store';
import { formatCurrency } from '@/utils/helpers';

import type { CartItem } from '@/types/OrderTypes';

const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const formErrors = useActionData();

  const cart = useAppSelector(getCart);
  const totalCardPrice = useAppSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCardPrice * 0.2 : 0;
  const totalPrice = totalCardPrice + priorityPrice;
  const isSubmitting = navigation.state === 'submitting';
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useAppSelector((state) => state.user);
  const isLoadingAdress = addressStatus === 'loading';

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Pripravený na objednávku? Poďme na to!</h2>
      <p> {username}</p>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Meno</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
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

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Adresa</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAdress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{errorAddress}</p>
            )}
          </div>
          <span className="absolute right-1 top-[5px] z-50">
            {!position.latitude && !position.longitude && (
              <Button
                disabled={isLoadingAdress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Najdi poziciu
              </Button>
            )}
          </span>
        </div>

        <div className="mb-12 flex items-center gap-x-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Chcete dať svojej objednávke prioritu?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting || isLoadingAdress}>
            {isSubmitting
              ? 'Zadavam objednavku'
              : `Objednať teraz za ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  let lat: number | null = null;
  let lng: number | null = null;
  if (data.position && typeof data.position === 'string' && data.position.trim() !== '') {
    const [latStr, lngStr] = data.position.split(',');
    lat = parseFloat(latStr.trim());
    lng = parseFloat(lngStr.trim());
  }

  const order = {
    customer: data.customer as string,
    address: data.address as string,
    phone: data.phone as string,
    cart: JSON.parse(data.cart as string).map((item: CartItem) => ({
      ...item,
      pizzaId: item.id,
    })),
    priority: data.priority === 'on',
    latitude: lat,
    longitude: lng,
  };

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  const errors: Record<string, string> = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Prosim, zadajte Vase spravne aktualne telefonne cislo';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;

