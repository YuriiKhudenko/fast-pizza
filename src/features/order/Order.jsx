// Test ID: IIDSAT

import { useEffect } from 'react';

import { useFetcher, useLoaderData } from 'react-router-dom';

import MakePriority from './MakePriority';
import OrderItem from './OrderItem';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = useLoaderData();
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') {
      fetcher.load('/menu');
    }
  }, [fetcher]);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">
          <span className="font-thin">Order</span> #{id}
        </h2>

        <div className="flex flex-wrap items-center gap-2 space-x-2">
          <span className="text-xl font-semibold">status: </span>
          <div className="colum flex gap-2">
            {priority && (
              <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
                Priority
              </span>
            )}
            <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
              {status} order
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-100 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😉`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-400 border-b border-t border-stone-400">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId)
                .ingredients ?? []
            }
            isLoadingIngredients={fetcher.state === 'loading'}
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-100 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery:{' '}
          {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <MakePriority />}
    </div>
  );
}

// router passes an object with context, params and request fields
export const loader = async ({ params }) => {
  return await getOrder(params.orderId);
};

export default Order;
