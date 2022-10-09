import { ReactNode } from "react";

const className = {
  form: "flex flex-col m-2"
};

interface FormProps {
  classname?: string;
  children: ReactNode;
  [key: string]: any;
}

export default function Form({ children, classname }: FormProps) {
  return <form className={`${className.form} ${classname}`}>{children}</form>;
}
