import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";
import defaultImage from "~/assets/default/avator-1.png";

type Props = Avator & ComponentProps<"div">;

type Avator = {
  src?: string | null;
};

const avator = tv({
  base: "block h-10 w-10 rounded-full bg-slate-500",
});

function Avator(
  { className, ...props }: Props,
  ref: ForwardedRef<HTMLSourceElement>,
) {
  return (
    <picture ref={ref} {...props} className={avator({ className })}>
      <source srcSet={props.src || ""} />
      <img
        src={defaultImage}
        alt=""
        className="w-full rounded-full aspect-square"
      />
    </picture>
  );
}

export default forwardRef(Avator);
