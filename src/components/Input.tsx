const className = {
  label: "mb-1 text-xs tracking-wide text-gray-600",
  input:
    "text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border py-2 focus:outline-none mb-2"
};

interface InputProps {
  label: string;
  [key: string]: any;
}

export default function Input({ label, ...otherProps }: InputProps) {
  return (
    <>
      <label htmlFor="new-item" className={className.label}>
        Enter a new {label}
      </label>
      <input
        className={className.input}
        placeholder={`Enter a new ${label}`}
        {...otherProps}
      />
    </>
  );
}
