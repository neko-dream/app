import { ComponentProps, ForwardedRef, forwardRef } from "react";

type Props = ComponentProps<"input">;

function Input(
  { className, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      ref={ref}
      className={`w-full rounded-md border border-gray-300 px-2 py-1 text-sm ${className}`}
    />
  );
}

export default forwardRef(Input);
