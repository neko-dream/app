import { animated } from "@react-spring/web";
import { Link, useNavigate } from "@remix-run/react";
import { useRef } from "react";
import { tv } from "tailwind-variants";
import SearchWhiteIcon from "~/assets/search-white.svg";
import Input from "~/components/Input";
import { useOpenModalAnimation } from "../../animation/useOpenModalAnimation";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const link = tv({
  base: "flex h-10 px-4 items-center text-sm",
});

export const SearchMenuDialog = ({ open, onOpenChange, ...props }: Props) => {
  const transition = useOpenModalAnimation({ open });

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleCloseModal = () => onOpenChange(false);

  const handleSubmit = () => {
    const query = encodeURIComponent(inputRef.current?.value || "");
    navigate(`/home?q=${query}`);
    handleCloseModal();
  };

  return transition((style, item) => {
    if (!item) {
      return;
    }

    return (
      <>
        <animated.div style={style} className="absolute top-0 w-[375px] z-10">
          <div
            {...props}
            className="absolute flex flex-col w-full max-w-[375px] bg-white z-10 pt-10"
          >
            <div className="flex p-4 space-x-2">
              <Input
                className="h-10"
                placeholder="キーワードで検索"
                ref={inputRef}
              />
              <button
                onClick={handleSubmit}
                className="bg-blue-500 w-10 h-10 shrink-0 rounded-md flex items-center justify-center hover:opacity-80"
              >
                <img
                  src={SearchWhiteIcon}
                  alt=""
                  loading="lazy"
                  className="fill-white"
                />
              </button>
            </div>
            <Link
              to={"/home?q=latest"}
              className={link()}
              onClick={handleCloseModal}
            >
              新着のセッション
            </Link>
            <Link
              to={"/home?q=mostReplies"}
              className={link()}
              onClick={handleCloseModal}
            >
              盛り上がってるセッション
            </Link>
            <Link
              to={"/home?q=oldest"}
              className={link()}
              onClick={handleCloseModal}
            >
              もうすぐ終了するセッション
            </Link>
          </div>
        </animated.div>
        <animated.div
          style={{ opacity: style.opacity }}
          className="w-[375px] top-0 absolute bg-slate-600/60 h-full"
          onClick={handleCloseModal}
        ></animated.div>
      </>
    );
  });
};
