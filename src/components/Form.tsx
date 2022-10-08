import { FormEvent, ReactNode } from "react";

const className = {
  form: "flex flex-col m-2"
};

interface FormProps {
  classname?: string;
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function Form({ children, classname, onSubmit }: FormProps) {
  return (
    <form className={`${className.form} ${classname}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
