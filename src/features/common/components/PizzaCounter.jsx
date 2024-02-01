import { useDispatch } from 'react-redux';

import Button from '../../../ui/Button';
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from '../../cart/cartSlice';

const PizzaCounter = ({ id, children }) => {
  const dispatch = useDispatch();

  const handleAddPizza = () => {
    dispatch(increaseItemQuantity(id));
  };

  const handleRemovePizza = () => {
    dispatch(decreaseItemQuantity(id));
  };

  const handleDelete = () => {
    dispatch(deleteItem(id));
  };

  return (
    <div className="flex items-center gap-3 sm:gap-8">
      <div className="flex items-center gap-2 md:gap-3">
        <Button type="round" onClick={handleRemovePizza}>
          -
        </Button>
        <span>{children}</span>
        <Button type="round" onClick={handleAddPizza}>
          +
        </Button>
      </div>
      <Button type="small" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default PizzaCounter;
