import { Outlet, useNavigation } from 'react-router-dom';

import Loader from './../ui/Loader';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          {/* // render whatever is a current nested route */}
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
};

export default AppLayout;
