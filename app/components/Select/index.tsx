import { ComponentProps, ForwardedRef, forwardRef, ReactNode } from "react";
import { tv } from "tailwind-variants";

type variants = "normal" | "error";

type Props = ComponentProps<"select"> & {
  children: ReactNode;
  placeholader?: string;
  defaultValue?: string;
  variant?: variants;
  options: { value: string; title: string }[];
};

const select = tv({
  slots: {
    base: "h-12 border border-gray-300 rounded-md w-full px-4 text-gray-400",
    placeholder: "hidden text-gray-400",
  },
  variants: {
    variant: {
      error: "",
      normal: "",
    },
  },
});

function Select(
  { variant, className, placeholader, options, defaultValue, ...props }: Props,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const { placeholder, base } = select({ variant, class: className });

  return (
    <select
      {...props}
      id="select"
      ref={ref}
      className={base()}
      defaultValue={defaultValue || "0"}
      onChange={(e) => {
        e.currentTarget.style.color = "black";
      }}
    >
      <option disabled value="0" className={placeholder()}>
        {placeholader ? placeholader : "選択する"}
      </option>
      {options.map(({ value, title }) => {
        return <option value={value}>{title}</option>;
      })}
    </select>
  );
}

export default forwardRef(Select);
