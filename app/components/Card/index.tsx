import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useState,
} from "react";
import { RiChat1Line, RiMore2Fill } from "react-icons/ri";
import { tv } from "tailwind-variants";
import { OpinionType } from "~/feature/opinion/types";
import { User } from "~/feature/user/types";
import Avator from "../Avator";
import Badge from "../Badge";
import Button from "../Button";
import { toast } from "react-toastify";

type Props = Card & ComponentProps<"div">;

type Card = {
  description: string;
  children?: ReactNode;
  opinionStatus?: OpinionType;
  user: User;
  isOpnionLink?: string;
  isJegde?: boolean;
  onClickVoteButton?: (v: string) => void;
  myVoteType?: OpinionType;
};

const card = tv({
  base: "relative rounded-md border border-solid border-black p-4",
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
    myVoteType,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setIsTooltipOpen(!isTooltipOpen);
    console.log("Button clicked");
  };

  const handleCloseButton = () => {
    toast.success("通報しました");
    setIsTooltipOpen(false);
  };

  return (
    <div {...props} ref={ref} className={card({ class: className })}>
      <div className="flex items-center">
        <Avator src={user.iconURL} className="" />
        <p className="ml-2 mr-auto text-xs text-[#6d6c6a]">
          {user.displayName}
        </p>
        <Badge status={opinionStatus} className="ml-2 mr-8" />
      </div>

      <p className="card-description mt-2 text-[#4e4d4b]">{description}</p>

      <button
        className="absolute right-4 top-6 z-10"
        onClick={handleButtonClick}
      >
        <RiMore2Fill size={24} />
      </button>

      {isTooltipOpen && (
        <div className="absolute right-12 top-3 rounded border border-gray-500 bg-white p-2">
          <button onClick={() => handleCloseButton()}>通報する</button>
        </div>
      )}

      {children}

      <RpleyLink to={isOpnionLink} />

      {isJegde && (
        <div className="mt-4 flex justify-between">
          <Button
            className="h-8 w-24 p-1"
            variation={myVoteType === "disagree" ? "disagree" : "disabled"}
            onClick={() => onClickVoteButton?.("disagree")}
          >
            違うかも
          </Button>
          <Button
            className="h-8 w-24 p-1"
            variation={myVoteType === "pass" ? "pass" : "disabled"}
            onClick={() => onClickVoteButton?.("pass")}
          >
            保留
          </Button>
          <Button
            className="h-8 w-24 p-1"
            variation={myVoteType === "agree" ? "agree" : "disabled"}
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
    <div className="mt-2 flex items-center justify-end text-blue-500">
      <RiChat1Line />
      <p className="ml-1 text-sm">返信画面にいく</p>
    </div>
  );
}

export default forwardRef(Card);
