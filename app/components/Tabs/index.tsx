import { Link } from "@remix-run/react";
import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

type Props = ComponentProps<"div"> & {
  items: Array<{
    label: string;
    href: string;
  }>;
  active?: string;
};

const tabs = tv({
  base: "flex justify-around h-10",
});

const link = tv({
  base: "border-b-2 border-white w-full h-full flex items-center justify-center",
  variants: {
    active: { true: "border-b-2 border-blue-500" },
  },
});

function Tabs(
  { className, items, active, ...props }: Props,
  ref: ForwardedRef<HTMLParagraphElement>,
) {
  return (
    <div {...props} ref={ref} className={tabs()}>
      {items.map(({ href, label }, i) => {
        return (
          <Link
            to={href}
            className={link({ active: active === label })}
            key={i}
            prefetch="viewport"
            replace={true}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

export default forwardRef(Tabs);
