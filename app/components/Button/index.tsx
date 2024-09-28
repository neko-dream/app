import { ComponentProps, ForwardedRef, forwardRef, ReactNode } from "react";
import { OpinionBgColorMap } from "~/constants/opinion";

type Props = Button & {
  children: ReactNode;
} & ComponentProps<"button">;

type Button = {
  outline?: boolean;
  variation: keyof typeof variationMap;
};

const variationMap = {
  outline: "border-2 border-solid border-green-500 text-green-500",
  primary: "bg-green-500 text-white",
  agree: "text-white",
  disagree: "text-white",
  pass: "text-white bg-[#ceccca]",
} as const;

function Button(
  { children, variation, className, ...props }: Props,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      ref={ref}
      className={`w-full max-w-[175px] rounded-full px-4 py-2 font-bold ${variationMap[variation]} ${OpinionBgColorMap[variation as never]} ${className}`}
    >
      {children}
    </button>
  );
}

export default forwardRef(Button);
