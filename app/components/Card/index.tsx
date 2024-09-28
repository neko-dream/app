import { ComponentProps, ForwardedRef, forwardRef, ReactNode } from "react";
import Avator from "../Avator";
import Badge from "../Badge";
import { OpinionJpMap } from "~/constants/opinion";
import { User } from "~/types/User";
import { Link } from "@remix-run/react";
import { RiChat1Line, RiMore2Fill } from "react-icons/ri";

type Props = Card & ComponentProps<"div">;

type Card = {
  title: string;
  description: string;
  children: ReactNode;
  opinionStatus: keyof typeof OpinionJpMap;
  user: User;
};

function Card(
  { user, title, description, opinionStatus, className, ...props }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={`card rounded-md border border-solid border-black p-4 ${className}`}
    >
      <Avator src={user.photoURL} className="card-avator" />
      <p className="card-title">{title}</p>

      <div className="card-status flex items-center space-x-2">
        <Badge status={opinionStatus} />
        <p className="text-xs text-[#6d6c6a]">{user.displayName}</p>
      </div>

      <RiMore2Fill className="card-meatball" size={24} />

      <p className="card-description mt-2 text-[#4e4d4b]">{description}</p>
      <Link
        to="#"
        className="card-link mt-1 flex items-center space-x-1 text-blue-500"
      >
        <RiChat1Line />
        <p className="text-sm">コメント16件</p>
      </Link>
    </div>
  );
}

export default forwardRef(Card);
