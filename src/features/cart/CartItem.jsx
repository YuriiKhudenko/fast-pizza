import { formatCurrency } from '../../utils/helpers';
import PizzaCounter from '../common/components/PizzaCounter';

const CartItem = ({ item }) => {
  const { pizzaId, name, quantity, totalPrice } = item || {};

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="mt-1 flex items-center justify-between sm:gap-7">
        <p className="text-sm font-bold">
          {formatCurrency(totalPrice)}
        </p>
        <PizzaCounter id={pizzaId}>{quantity}</PizzaCounter>
      </div>
    </li>
  );
};

export default CartItem;
