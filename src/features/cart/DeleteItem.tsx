import { useAppDispatch } from '@/store/hooks';
import Button from '@/ui/Button';
import { deleteItem } from '@/features/cart/cartSlice';

function DeleteItem({ id }) {
  const dispatch = useAppDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(id))}>
      Odstranit
    </Button>
  );
}

export default DeleteItem;
