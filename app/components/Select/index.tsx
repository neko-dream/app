import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

type Props = ComponentProps<"select"> & {
  options: { value: string; title: string }[];
  placeholader?: string;
  error?: boolean;
  useNonSelect?: boolean;
};

const select = tv({
  slots: {
    base: "h-12 border border-gray-300 rounded-md w-full px-4 text-gray-400",
    placeholder: "hidden text-gray-400",
  },
  variants: {
    error: {
      true: "border-red-500",
    },
  },
});

function Select(
  { error, className, options, placeholader, ...props }: Props,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const { placeholder, base } = select({ error, class: className });

  return (
    <select
      {...props}
      ref={ref}
      className={base()}
      onChange={(e) => {
        props.onChange && props.onChange(e);
        e.currentTarget.style.color = "black";
      }}
      defaultValue="0"
    >
      <option value="0" disabled className={placeholder()}>
        {placeholader || "選択する"}
      </option>
      <option value={"1"}>---</option>
      {options.map(({ value, title }, i) => {
        return (
          <option key={i} value={value}>
            {title}
          </option>
        );
      })}
    </select>
  );
}

export default forwardRef(Select);
