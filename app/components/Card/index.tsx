import { Link } from "@remix-run/react";
import { ComponentProps, ForwardedRef, forwardRef, ReactNode } from "react";
import { RiChat1Line } from "react-icons/ri";
import { tv } from "tailwind-variants";
import { OpinionJpMap } from "~/feature/opinion/constants";
import { User } from "~/feature/user/types";
import Avator from "../Avator";
import Badge from "../Badge";
import Button from "../Button";

type Props = Card & ComponentProps<"div">;

type Card = {
  description: string;
  children?: ReactNode;
  opinionStatus?: keyof typeof OpinionJpMap;
  user: User;
  isOpnionLink?: string;
  isJegde?: boolean;
  onClickVoteButton?: (v: string) => void;
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
    isJegde,
    onClickVoteButton,
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

      <p className="card-description mt-2 text-[#4e4d4b]">{description}</p>

      {children}

      <RpleyLink to={isOpnionLink} />

      {isJegde && (
        <div className="flex justify-between mt-2">
          <Button
            className="w-24 h-8 p-1"
            variation="disagree"
            onClick={() => onClickVoteButton?.("disagree")}
          >
            違うかも
          </Button>
          <Button
            className="w-24 h-8 p-1"
            variation="pass"
            onClick={() => onClickVoteButton?.("pass")}
          >
            保留
          </Button>
          <Button
            className="w-24 h-8 p-1"
            variation="agree"
            onClick={() => onClickVoteButton?.("agree")}
          >
            良さそう
          </Button>
        </div>
      )}
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
