import { useSelector } from 'react-redux';

import { getTotalPrice, getTotalQuantity } from './cartSlice';
import Button from '../../ui/Button';

function CartOverview() {
  const totalQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);

  if (!totalQuantity) {
    return null;
  }

  return (
    <div className="flex items-center justify-between bg-stone-700 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Button to="/cart" type="small">
        Open cart &rarr;
      </Button>
    </div>
  );
}

export default CartOverview;
