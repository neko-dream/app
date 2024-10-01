import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

type Props = ComponentProps<"input">;

const input = tv({
  base: "w-full rounded-md border border-gray-300 px-2 py-1 text-sm",
});

function Input(
  { className, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return <input {...props} ref={ref} className={input({ class: className })} />;
}

export default forwardRef(Input);
