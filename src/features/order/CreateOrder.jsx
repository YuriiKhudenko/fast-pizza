import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();

  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  // As a component is connected to the action below, we can access to
  // whatever was returned in case there was no submition
  const errors = useActionData();

  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Lets go!</h2>

      {/* {/* <Form method="POST" action="/order/new">  action by default} */}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
            <p>{errors?.phone && errors.phone}</p>
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button disabled={isSubmitting}>Order now</button>
        </div>
      </Form>
    </div>
  );
}

// Whenever a Form(from react-router-dom) will be submitted, React Router call THIS action
// and will pass in the request that was submitted.
export const action = async ({ request }) => {
  const formData = await request.formData(); // formData - browser api
  const rawData = Object.fromEntries(formData);
  const parseCart = JSON.parse(rawData.cart);
  const priority = rawData.priority === "on";

  const order = {
    ...rawData,
    cart: parseCart,
    priority: priority,
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please, enter a valid phone number☎️. We might use it to contact you";
    return errors;
  }

  const orderInfo = await createOrder(order);

  return redirect(`/order/${orderInfo.id}`);
};

export default CreateOrder;
