import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";
import defaultImage from "~/assets/default/avator-1.png";

type Props = Avator & ComponentProps<"div">;

type Avator = {
  src: string;
};

const avator = tv({
  base: "h-10 w-10 rounded-full bg-slate-500",
});

function Avator(
  { className, ...props }: Props,
  ref: ForwardedRef<HTMLSourceElement>,
) {
  return (
    <picture ref={ref} {...props}>
      <source srcSet={props.src} media="(orientation: portrait)" />
      <img src={defaultImage} alt="" className={avator({ className })} />
    </picture>
  );
}

export default forwardRef(Avator);
