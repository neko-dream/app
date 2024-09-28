import { ComponentProps, ForwardedRef, forwardRef } from "react";

type Props = ComponentProps<"textarea">;

function Textarea(
  { className, ...props }: Props,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      ref={ref}
      className={`w-full rounded-md border border-gray-300 px-2 py-1 text-sm ${className}`}
    />
  );
}

export default forwardRef(Textarea);
