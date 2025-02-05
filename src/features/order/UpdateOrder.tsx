import Button from '@/ui/Button';

import { useFetcher, ActionFunctionArgs } from 'react-router-dom';
import { updateOrder } from '@/services/apiData';

import type { Order } from '@/types/OrderTypes';

type UpdateOrderProp = {
  order: Order;
};

function UpdateOrder({ order }: UpdateOrderProp) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button>Chcem prioritu</Button>
    </fetcher.Form>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const data = { priority: true };

  if (params.id) {
    await updateOrder(params.id, data);
  }

  return null;
};

export default UpdateOrder;
