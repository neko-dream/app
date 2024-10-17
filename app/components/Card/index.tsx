import { ComponentProps, ForwardedRef, forwardRef, ReactNode } from "react";
import { RiChat1Line } from "react-icons/ri";
import { tv } from "tailwind-variants";
import { OpinionJpMap } from "~/constants/opinion";
import { User } from "~/feature/user/types";
import Avator from "../Avator";
import Badge from "../Badge";

type Props = Card & ComponentProps<"div">;

type Card = {
  title: string;
  description: string;
  children?: ReactNode;
  opinionStatus: keyof typeof OpinionJpMap;
  user: User;
};

const card = tv({
  base: "rounded-md border border-solid border-black p-4",
});

function Card(
  {
    user,
    title,
    description,
    opinionStatus,
    children,
    className,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div {...props} ref={ref} className={card({ class: className })}>
      <Avator src={user.photoURL} className="card-avator" />
      <p className="card-title">{title}</p>

      <div className="card-status flex items-center space-x-2">
        <Badge status={opinionStatus} />
        <p className="text-xs text-[#6d6c6a]">{user.displayName}</p>
      </div>

      {/* <button className="ml-auto">
        <RiMore2Fill className="card-meatball" size={24} />
      </button> */}

      {children}

      <p className="card-description mt-2 text-[#4e4d4b]">{description}</p>
      <div className="card-link mt-1 flex items-center space-x-1 text-blue-500">
        <RiChat1Line />
        <p className="text-sm">コメント16件</p>
      </div>
    </div>
  );
}

export default forwardRef(Card);
