import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";
import { NON_SELECT_VALUE } from "./constants";

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
  { error, className, placeholader, options, useNonSelect, ...props }: Props,
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
    >
      <option value={NON_SELECT_VALUE} className={placeholder()}>
        {placeholader ? placeholader : "選択する"}
      </option>
      {options.map(({ value, title }, i) => {
        return (
          <option key={i} value={value}>
            {title}
          </option>
        );
      })}
      {useNonSelect && <option value={NON_SELECT_VALUE}>---</option>}
    </select>
  );
}

export default forwardRef(Select);
