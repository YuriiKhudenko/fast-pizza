import {
  Form,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Input from './Input';
import Button from '../../ui/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

const CreateOrder = () => {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();

  const isSubmitting =
    navigation.state === 'submitting' ||
    navigation.state === 'loading';

  // As a component is connected to the action below, we can access to
  // whatever was returned in case there was no submition
  const errors = useActionData();
  console.log('errors: ', errors);

  const cart = fakeCart;

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
        />
        <Input
          label="Phone number"
          name="phone"
          placeholder="Please, enter your phone number"
          error={errors}
        />
        <Input
          label="Address"
          name="address"
          placeholder="Please, enter your address"
        />
        <div className="mb-8 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
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
          <Button disabled={isSubmitting} type="primary">
            Order now
          </Button>
          {/* <button
            disabled={isSubmitting}
            className="inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
          ></button> */}
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
  const priority = rawData.priority === 'on';

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

  const orderInfo = await createOrder(order);

  return redirect(`/order/${orderInfo.id}`);
};

export default CreateOrder;
