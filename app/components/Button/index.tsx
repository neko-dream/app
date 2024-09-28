import { ComponentProps, ForwardedRef, forwardRef, ReactNode } from "react";

type Props = Button & {
  children: ReactNode;
} & ComponentProps<"button">;

type Button = {
  outline?: boolean;
};

function Button(
  { children, outline = false, ...props }: Props,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      ref={ref}
      className={`w-full max-w-[175px] px-4 py-2 font-bold ${outline && "rounded-full border-2 border-solid border-green-500 text-green-500"} ${!outline && "rounded-full bg-green-500 text-white"}`}
    >
      {children}
    </button>
  );
}

export default forwardRef(Button);
