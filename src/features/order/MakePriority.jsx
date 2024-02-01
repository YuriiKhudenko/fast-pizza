import { useFetcher } from 'react-router-dom';

import { updateOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';

const MakePriority = () => {
  const fetcher = useFetcher();
  console.log('fetcher.state ', fetcher.state);
  return (
    <div className="text-right">
      <fetcher.Form method="PATCH">
        <Button
          type="primary"
          disabled={
            fetcher.state === 'loading' ||
            fetcher.state === 'submitting'
          }
        >
          Make priority
        </Button>
      </fetcher.Form>
    </div>
  );
};

export const action = async ({ params }) => {
  const { orderId } = params;
  const priorityData = {
    priority: true,
  };
  await updateOrder(orderId, priorityData);

  return null;
};

export default MakePriority;
