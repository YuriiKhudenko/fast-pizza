const Input = ({
  label,
  name,
  placeholder,
  disabled = false,
  defaultValue,
  children,
}) => {
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
          defaultValue={defaultValue}
          required
          disabled={disabled}
        />
        {children}
      </div>
    </div>
  );
};

export default Input;
