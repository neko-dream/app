import { Link } from "@remix-run/react";
import { ComponentProps, ForwardedRef, forwardRef, ReactNode } from "react";
import { RiChat1Line } from "react-icons/ri";
import { tv } from "tailwind-variants";
import { OpinionJpMap } from "~/constants/opinion";
import { User } from "~/feature/user/types";
import Avator from "../Avator";
import Badge from "../Badge";

type Props = Card & ComponentProps<"div">;

type Card = {
  description: string;
  children?: ReactNode;
  opinionStatus: keyof typeof OpinionJpMap;
  user: User;
  isOpnionLink?: string;
};

const card = tv({
  base: "rounded-md border border-solid border-black p-4",
});

function Card(
  {
    user,
    description,
    opinionStatus,
    children,
    className,
    isOpnionLink,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div {...props} ref={ref} className={card({ class: className })}>
      <div className="flex items-center">
        <Avator src={user.photoURL} className="" />
        <p className="text-xs ml-2 mr-auto text-[#6d6c6a]">
          {user.displayName}
        </p>
        <Badge status={opinionStatus} className="ml-2" />
      </div>

      {children}

      <p className="card-description mt-2 text-[#4e4d4b]">{description}</p>

      <RpleyLink to={isOpnionLink} />
    </div>
  );
}

type RpleyLinkProps = {
  to?: string;
};

function RpleyLink({ to }: RpleyLinkProps) {
  if (!to) {
    return null;
  }

  return (
    <Link to={to} className="mt-2 flex items-center text-blue-500 justify-end">
      <RiChat1Line />
      <p className="text-sm ml-1">返信画面にいく</p>
    </Link>
  );
}

export default forwardRef(Card);
