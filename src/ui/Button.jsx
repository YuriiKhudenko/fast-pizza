import { Link } from 'react-router-dom';

const Button = ({ children, disabled = false, to = null, type }) => {
  const base =
    'inline-block text-sm rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 transition-colors hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';
  const styles = {
    primary: base + ' px-4 py-3 sm:px-6 sm:py-4',
    small:
      base + ' text-xs px-2 py-2 md:px-5 md:py-2.5 md:text-small',
    secondary:
      ' text-sm bg-transparrent inline-block rounded-full border-2 border-stone-300 px-4 py-3 font-semibold uppercase tracking-wide text-stone-500 transition-colors hover:bg-stone-400 hover:text-stone-600 focus:bg-stone-400 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4',
  };

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
