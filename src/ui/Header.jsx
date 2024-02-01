import { Link } from 'react-router-dom';

import Logo from './assests/img/logo.svg?react';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-4 uppercase sm:px-6">
      <Link
        to="/"
        className="flex items-center gap-2 font-bold tracking-widest"
      >
        <div className="h-[45px] w-[45px]">
          <Logo />
        </div>
        Fast Pizza
      </Link>
      <div className="flex items-center space-x-2">
        <SearchOrder />
        <Username />
      </div>
    </header>
  );
}

export default Header;
