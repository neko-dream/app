import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

type Props = ComponentProps<"textarea">;

const textarea = tv({
  base: "w-full rounded-md border border-gray-300 px-2 py-1 text-sm",
});

function Textarea(
  { className, ...props }: Props,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  return (
    <textarea {...props} ref={ref} className={textarea({ class: className })} />
  );
}

export default forwardRef(Textarea);
