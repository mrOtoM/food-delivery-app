import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div>
      <p>
        <span>2 pizza</span>
        <span>10.99€</span>
      </p>
      <Link to="/cart">Otvorit kartu &rarr;</Link>
    </div>
  );
}

export default CartOverview;
