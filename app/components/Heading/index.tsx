import { ComponentProps, ForwardedRef, forwardRef, ReactNode } from "react";

type Props = Heading & ComponentProps<"div">;

type Heading = {
  children: ReactNode;
};

function Heading(
  { className, children, ...props }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={`flex h-6 items-center bg-slate-200 pl-4 text-sm ${className}`}
    >
      {children}
    </div>
  );
}

export default forwardRef(Heading);
