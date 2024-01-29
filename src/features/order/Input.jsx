const Input = ({ label, name, placeholder, error }) => {
  return (
    <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
      <label htmlFor={name} className="sm:basis-40">
        {label}
      </label>
      <div className="grow">
        <input
          id={name}
          type="text"
          name={name}
          placeholder={placeholder}
          className="input w-full"
          required
        />
        {error?.phone ? (
          <p className="mt-2 block rounded-md bg-red-100 p-2 text-xs text-red-700 ">
            {error.phone}
          </p>
        ) : (
          ''
        )}
        <p></p>
      </div>
    </div>
  );
};

export default Input;
