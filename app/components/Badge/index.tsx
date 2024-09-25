import { ComponentProps, ForwardedRef, forwardRef } from "react";

type Props = Badge & ComponentProps<"div">;

type Badge = {
  status: "";
};

function Badge({ ...props }: Props, ref: ForwardedRef<HTMLImageElement>) {
  return (
    <div
      {...props}
      ref={ref}
      className="max-w-8 rounded-md bg-blue-400 text-center text-xs text-white"
    >
      賛成
    </div>
  );
}

export default forwardRef(Badge);
