import Button from '@/ui/Button';
import { useAppDispatch } from '@/store/hooks';
import { decreaseItemQuantity, increaseItemQuantity } from '@/features/cart/cartSlice';

function UpdateItemQuantity({ id, currentQuantity }: { id: number; currentQuantity: number }) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-x-1 md:gap-x-2">
      <Button type="rounded" onClick={() => dispatch(decreaseItemQuantity(id))}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="rounded" onClick={() => dispatch(increaseItemQuantity(id))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
