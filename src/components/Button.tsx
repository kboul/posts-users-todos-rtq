const className = {
  button:
    "flex justify-center text-black text-sm px-4 py-2 border rounded-2xl text-center bg-blue-300 hover:bg-blue-400"
};

interface ButtonProps {
  label: string;
}

export default function Button({ label }: ButtonProps) {
  return <button className={className.button}>{label}</button>;
}
