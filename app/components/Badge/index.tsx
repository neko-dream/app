import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { OpinionBgColorMap, OpinionJpMap } from "~/constants/opinion";

type Props = Badge & ComponentProps<"button">;

type Badge = {
  status: keyof typeof OpinionJpMap;
  isSelectStyle?: boolean;
};

function Badge(
  { status, className, isSelectStyle, ...props }: Props,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const bgColor = isSelectStyle
    ? "border-2 border-solid border-gray-400 text-gray-500"
    : OpinionBgColorMap[status];

  return (
    <button
      {...props}
      ref={ref}
      className={`${bgColor} flex h-6 w-10 items-center justify-center rounded-full text-center text-xs text-white ${className}`}
    >
      {OpinionJpMap[status]}
    </button>
  );
}

export default forwardRef(Badge);
