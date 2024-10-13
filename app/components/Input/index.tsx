import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

type Props = ComponentProps<"input"> & {
  error?: boolean;
};

const input = tv({
  base: "w-full rounded-md border border-gray-300 px-2 py-1 text-sm",
  variants: {
    error: { true: "border-red-500" },
  },
});

function Input(
  { className, error, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return <input {...props} ref={ref} className={input({ className, error })} />;
}

export default forwardRef(Input);
