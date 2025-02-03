import LinkButton from '@/ui/LinkButton';

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Naspat na menu</LinkButton>

      <p className="mt-4 font-semibold">Tvoja karta je prazda. Pridaj polozku.</p>
    </div>
  );
}

export default EmptyCart;

