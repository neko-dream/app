import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { OpinionBgColorMap, OpinionJpMap } from "~/constants/opinion";

type Props = Badge & ComponentProps<"div">;

type Badge = {
  status: keyof typeof OpinionJpMap;
};

function Badge(
  { status, className, ...props }: Props,
  ref: ForwardedRef<HTMLImageElement>,
) {
  const bgColor = OpinionBgColorMap[status];

  return (
    <div
      {...props}
      ref={ref}
      className={`${bgColor} flex h-6 w-10 items-center justify-center rounded-full text-center text-xs text-white ${className}`}
    >
      {OpinionJpMap[status]}
    </div>
  );
}

export default forwardRef(Badge);
