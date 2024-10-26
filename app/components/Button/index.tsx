import { ComponentProps, ForwardedRef, forwardRef, ReactNode } from "react";
import { tv } from "tailwind-variants";

type variants = "primary" | "agree" | "disagree" | "pass" | "disabled";

type Props = ComponentProps<"button"> & {
  variation?: variants;
  children: ReactNode;
  outline?: boolean;
};

export const button = tv({
  base: "text-center w-full max-w-[175px] rounded-full p-2 font-bold disabled:opacity-30",
  variants: {
    color: {
      primary: "bg-green-500 text-white border-green-500",
      agree: "text-white bg-[#32ADE6] border-[#32ADE6]",
      disagree: "text-white bg-[#FF2D55] border-[#FF2D55]",
      pass: "text-white bg-[#AF52DE] border-[#AF52DE]",
      disabled: "text-white bg-gray-200 border-gray-200",
    } satisfies { [x in variants]: string },
    outline: {
      true: "border-2 border-solid bg-white text-gray-500",
    },
  },
});

function Button(
  { children, variation, className, outline = false, ...props }: Props,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      className={button({ color: variation, class: className, outline })}
      ref={ref}
    >
      {children}
    </button>
  );
}

export default forwardRef(Button);
