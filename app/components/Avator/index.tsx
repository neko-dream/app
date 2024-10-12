import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

type Props = Avator & ComponentProps<"div">;

type Avator = {
  src: string;
};

const avator = tv({
  base: "h-10 w-10 rounded-full bg-slate-500",
});

function Avator(
  { className, ...props }: Props,
  ref: ForwardedRef<HTMLImageElement>,
) {
  return (
    <img
      {...props}
      ref={ref}
      src={props.src}
      alt=""
      className={avator({
        class: className,
      })}
      onError={(err) => {
        const num = Math.floor(Math.random() * 2 + 1);

        err.currentTarget.src = `/default/avator-${num}.png`;
      }}
    />
  );
}

export default forwardRef(Avator);
