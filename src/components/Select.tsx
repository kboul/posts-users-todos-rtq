interface SelectProps {
  options: { data: any[]; option: string; value: string };
  label: string;
  [key: string]: any;
}

const className = {
  label: "mb-1 text-xs tracking-wide text-gray-600",
  select:
    "text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border py-2 focus:outline-none mb-2"
};

export default function Select({ label, options, ...otherProps }: SelectProps) {
  return (
    <>
      <label className={className.label}>{label}</label>
      <select className={className.select} {...otherProps}>
        {options?.data.map((item) => (
          <option key={item.name} value={item[options.value]}>
            {item[options.option]}
          </option>
        ))}
      </select>
    </>
  );
}
