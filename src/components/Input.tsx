import { ChangeEvent } from "react";

const className = {
  label: "mb-1 text-xs tracking-wide text-gray-600",
  input:
    "text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border py-2 focus:outline-none mb-2"
};

interface InputProps {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function Input({ label, onChange, value }: InputProps) {
  return (
    <>
      <label htmlFor="new-item" className={className.label}>
        Enter a new {label}
      </label>
      <input
        className={className.input}
        onChange={onChange}
        placeholder={`Enter a new ${label}`}
        value={value}
      />
    </>
  );
}
