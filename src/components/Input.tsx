const className = {
  label: "mb-1 text-xs tracking-wide text-gray-600",
  input:
    "text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border py-2 focus:outline-none mb-2"
};

interface InputProps {
  label: string;
  textarea?: boolean;
  [key: string]: any;
}

export default function Input({ label, textarea, ...otherProps }: InputProps) {
  const commomProps = {
    className: className.input,
    placeholder: `Enter a new ${label}`
  };

  return (
    <>
      <label htmlFor="new-item" className={className.label}>
        Enter a new {label}
      </label>
      {textarea ? (
        <textarea rows={5} {...commomProps} {...otherProps} />
      ) : (
        <input {...commomProps} {...otherProps} />
      )}
    </>
  );
}
