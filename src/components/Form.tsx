import { FormEvent, ReactNode } from "react";

const className = {
  form: "flex flex-col m-2"
};

interface FormProps {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <form className={className.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
