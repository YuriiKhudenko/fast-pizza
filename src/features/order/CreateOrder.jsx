import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import Input from './Input';
import store from '../../../store';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { clearCart, getCart, getTotalPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const CreateOrder = () => {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const username = useSelector((state) => state.user.username);

  const isSubmitting =
    navigation.state === 'submitting' ||
    navigation.state === 'loading';

  // As a component is connected to the action below, we can access to
  // whatever was returned in case there was no submition
  const errors = useActionData();

  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);

  const {
    status: userStatus,
    address: userAddress,
    error: addressError,
  } = useSelector((state) => state.user);

  const isGeoLoading = userStatus === 'loading';

  const finalPrice = withPriority
    ? totalPrice * (20 / 100 + 1)
    : totalPrice;

  const handlePostion = (e) => {
    e.preventDefault();

    dispatch(fetchAddress());
  };

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-5 text-xl font-bold">
        Ready to order? Lets go!
      </h2>

      {/* {/* <Form method="POST" action="/order/new">  action by default} */}
      <Form method="POST">
        <Input
          label="First Name"
          name="customer"
          placeholder="Please, enter your name"
          defaultValue={username}
        />
        <Input
          label="Phone number"
          name="phone"
          placeholder="Please, enter your phone number"
        >
          {errors?.phone ? (
            <p className="mt-2 block rounded-md bg-red-100 p-2 text-xs text-red-700 ">
              {errors.phone}
            </p>
          ) : null}
        </Input>
        <div className="relative grow">
          <Input
            label="Address"
            name="address"
            placeholder="Please, enter your address"
            isAddress={true}
            disabled={isGeoLoading}
            defaultValue={userAddress || ''}
          >
            {addressError ? (
              <p className="mt-2 block rounded-md bg-red-100 p-2 text-xs text-red-700 ">
                {addressError}
              </p>
            ) : null}
            <div className="absolute right-[3px] top-[3px] z-20 md:right-[5px] md:top-[5px]">
              {!userAddress && (
                <Button
                  type="small"
                  onClick={handlePostion}
                  disabled={isGeoLoading}
                >
                  {isGeoLoading
                    ? 'Getting your postion...'
                    : 'Get Postion'}
                </Button>
              )}
            </div>
          </Input>
        </div>
        <div className="mb-8 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-bold">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input
            type="hidden"
            name="cart"
            value={JSON.stringify(cart)}
          />
          <Button
            disabled={isSubmitting || isGeoLoading}
            type="primary"
          >
            Order now {formatCurrency(finalPrice)}
          </Button>
        </div>
      </Form>
    </div>
  );
};

// Whenever a Form(from react-router-dom) will be submitted, React Router call THIS action
// and will pass in the request that was submitted.
export const action = async ({ request }) => {
  const formData = await request.formData(); // formData - browser api
  const rawData = Object.fromEntries(formData);
  const parseCart = JSON.parse(rawData.cart);
  const priority = rawData.priority === 'true';

  const order = {
    ...rawData,
    cart: parseCart,
    priority: priority,
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      'Please, enter a valid phone number☎️. We might use it to contact you';
    return errors;
  }
  console.log('order ', order);
  const orderInfo = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${orderInfo.id}`);
};

export default CreateOrder;
