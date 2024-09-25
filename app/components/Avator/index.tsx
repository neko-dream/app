import { ComponentProps, ForwardedRef, forwardRef } from "react";

type Props = Avator & ComponentProps<"div">;

type Avator = {
  src?: string;
};

function Avator({ ...props }: Props, ref: ForwardedRef<HTMLImageElement>) {
  return (
    <img
      {...props}
      ref={ref}
      src={props.src}
      alt=""
      className="h-8 w-8 rounded-full bg-slate-500"
    />
  );
}

export default forwardRef(Avator);
