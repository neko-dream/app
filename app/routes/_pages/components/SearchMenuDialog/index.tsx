import { Link, useNavigate } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { tv } from "tailwind-variants";
import SearchWhiteIcon from "~/assets/search-white.svg";
import Input from "~/components/Input";

type Props = {
  open: boolean;
  onChange: (open: boolean) => void;
};

const link = tv({
  base: "flex h-10 px-4 items-center text-sm",
});

export const SearchMenuDialog = ({ open, onChange }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const handleCloseModal = () => onChange(false);

  const handleSubmit = () => {
    const query = encodeURIComponent(inputRef.current?.value || "");
    navigate(`/home?q=${query}`);
    handleCloseModal();
  };

  if (!open) {
    return null;
  }

  return (
    <>
      <div
        onClick={handleCloseModal}
        className="absolute w-full max-w-[375px] h-full bg-gray-600/40"
      />

      <div className="absolute flex flex-col w-full max-w-[375px] bg-white z-10 pt-10">
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
        <Link to={"/home?q=finished"} className={link()}>
          新着のセッション
        </Link>
        <Link to={"/home?q=finished"} className={link()}>
          盛り上がってるセッション
        </Link>
        <Link to={"/home?q=finished"} className={link()}>
          地元のセッション
        </Link>
        <Link to={"/home?q=finished"} className={link()}>
          もうすぐ終了するセッション
        </Link>
      </div>
    </>
  );
};
