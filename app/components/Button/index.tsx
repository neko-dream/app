import { Link, RemixLinkProps } from "@remix-run/react/dist/components";
import { ComponentProps, ForwardedRef, forwardRef, ReactNode } from "react";
import { tv } from "tailwind-variants";
import { OpinionBgColorMap } from "~/constants/opinion";

type variants = "outline" | "primary" | "agree" | "disagree" | "pass";

type Props = (Button | Link) & {
  variation: variants;
  children: ReactNode;
};

type Link = {
  isLink?: true;
} & RemixLinkProps;

type Button = {
  isLink?: false;
  outline?: boolean;
} & ComponentProps<"button">;

const button = tv({
  base: "text-center w-full max-w-[175px] rounded-full p-2 font-bold",
  variants: {
    color: {
      outline: "border-2 border-solid border-green-500 text-green-500",
      primary: "bg-green-500 text-white",
      agree: `text-white ${OpinionBgColorMap["agree"]}`,
      disagree: `text-white ${OpinionBgColorMap["disagree"]}`,
      pass: `text-white ${OpinionBgColorMap["pass"]}`,
    } satisfies { [x in variants]: string },
  },
});

function Button(
  props: Props,
  ref: ForwardedRef<HTMLButtonElement & HTMLAnchorElement>,
) {
  const { children, variation, className, isLink } = props;

  if (isLink) {
    return (
      <Link
        {...props}
        className={button({ color: variation, class: className })}
        ref={ref}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...(props as Button)}
      className={button({ color: variation, class: className })}
      ref={ref}
    >
      {children}
    </button>
  );
}

export default forwardRef(Button);
