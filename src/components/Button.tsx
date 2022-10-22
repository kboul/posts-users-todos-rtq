const className = {
  button:
    "flex justify-center text-black text-sm px-4 py-2 border rounded-2xl text-center bg-blue-300 hover:bg-blue-400"
};

interface ButtonProps {
  label: string;
  [key: string]: any;
}

export default function Button({ label, ...otherProps }: ButtonProps) {
  return (
    <button className={className.button} {...otherProps}>
      {label}
    </button>
  );
}
