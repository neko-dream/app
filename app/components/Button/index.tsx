import { Link, RemixLinkProps } from "@remix-run/react/dist/components";
import { ComponentProps, ForwardedRef, forwardRef, ReactNode } from "react";
import { OpinionBgColorMap } from "~/constants/opinion";

type Props = (Button | Link) & {
  variation: keyof typeof variationMap;
  children: ReactNode;
};

type Link = {
  isLink?: true;
} & RemixLinkProps;

type Button = {
  isLink?: false;
  outline?: boolean;
} & ComponentProps<"button">;

const variationMap = {
  outline: "border-2 border-solid border-green-500 text-green-500",
  primary: "bg-green-500 text-white",
  agree: "text-white",
  disagree: "text-white",
  pass: "text-white bg-[#ceccca]",
} as const;

function Button(
  props: Props,
  ref: ForwardedRef<HTMLButtonElement & HTMLAnchorElement>,
) {
  const { children, variation, className, isLink } = props;

  const base = `text-center w-full max-w-[175px] rounded-full px-4 py-2 font-bold ${variationMap[variation]} ${OpinionBgColorMap[variation as never]} ${className}`;

  if (isLink) {
    return (
      <Link {...props} className={`${base} ${className}`} ref={ref}>
        {children}
      </Link>
    );
  }

  return (
    <button {...(props as Button)} className={`${base} ${className}`} ref={ref}>
      {children}
    </button>
  );
}

export default forwardRef(Button);
