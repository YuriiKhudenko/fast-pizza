import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  // React Router starts fetching data at the same time as it
  // starts rendering the current route unlike in useEffect when
  // data fetches on render approach
  const menu = useLoaderData();
  console.log('menu: ', menu);

  return (
    <ul className="divide-y divide-stone-300 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export const loader = async () => {
  return await getMenu();
};

export default Menu;
