import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";
import { OpinionJpMap } from "~/feature/opinion/constants";

type Props = Badge & ComponentProps<"button">;

type Badge = {
  status?: keyof typeof OpinionJpMap;
  isSelectStyle?: boolean;
};

const badge = tv({
  base: "flex h-6 w-16 items-center justify-center rounded-full text-center text-xs text-white",
  variants: {
    color: {
      agree: "bg-[#32ADE6]",
      disagree: "bg-[#FF2D55]",
      pass: "bg-[#AF52DE]",
    },
    isSelect: {
      true: "border-2 border-solid border-gray-400 bg-white text-gray-500",
    },
  },
});

function Badge(
  { status, isSelectStyle, className, ...props }: Props,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      ref={ref}
      className={badge({
        color: status,
        isSelect: isSelectStyle,
        class: className,
      })}
    >
      {/* FIXME: ここやばい */}
      {OpinionJpMap[status as never]}
    </button>
  );
}

export default forwardRef(Badge);
