import { useSelector } from 'react-redux';

const Username = () => {
  const user = useSelector((state) => state.user.username);
  return (
    user && (
      <p className="hidden text-sm font-semibold sm:block">{user}</p>
    )
  );
};

export default Username;
