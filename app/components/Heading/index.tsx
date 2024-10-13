import { ComponentProps, ForwardedRef, forwardRef, ReactNode } from "react";
import { tv } from "tailwind-variants";

type Props = Heading & ComponentProps<"div">;

type Heading = {
  children: ReactNode;
};

const heading = tv({
  base: "flex h-6 items-center bg-gray-100 pl-4 text-sm",
});

function Heading(
  { className, children, ...props }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div {...props} ref={ref} className={heading({ class: className })}>
      {children}
    </div>
  );
}

export default forwardRef(Heading);
