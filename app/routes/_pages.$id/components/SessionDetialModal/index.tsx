import { animated } from "@react-spring/web";
import { useEffect } from "react";
import { useOpinonModal } from "./hooks/useSessionDetialModal";
import { tv } from "tailwind-variants";
import { components } from "~/libs/api/openapi";

type Props = {
  open: boolean;
  onClose: () => void;
  session?: components["schemas"]["talkSession"];
};

const modal = tv({
  base: "absolute bottom-0 h-[calc(100dvh-188px)] w-[375px] touch-none will-change-transform",
});

export const SessionDetialModal = ({ open, onClose, session }: Props) => {
  const { item, api, bind } = useOpinonModal({
    onClose: () => handleCloseModal(),
  });

  useEffect(() => {
    if (open) {
      api.start({ opacity: 1, y: 0 });
    } else {
      api.start({ opacity: 1, y: 800 });
    }
  }, [api, open]);

  // MEMO: モーダルが開いている間はスクロール禁止する
  const noscroll = (e: Event) => e.preventDefault();

  useEffect(() => {
    if (open) {
      window.scrollTo(0, 0);
      document.addEventListener("touchmove", noscroll, {
        passive: false,
      });
      document.addEventListener("wheel", noscroll, { passive: false });
    }
    return () => {
      document.removeEventListener("touchmove", noscroll);
      document.removeEventListener("wheel", noscroll);
    };
  }, [open]);

  const handleCloseModal = () => {
    api.start(() => {
      return {
        opacity: 0,
        y: 500,
      };
    });
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <>
      <animated.div
        style={item}
        className={modal({
          className: "z-30 rounded-t-xl border-t border-gray-200 bg-white",
        })}
      >
        <animated.div
          {...bind()}
          className="mx-auto w-full cursor-pointer py-2"
        >
          <div className="mx-auto h-1 w-[50%] rounded-full bg-slate-400" />
          <p className="mt-2 select-none text-center">テーマの詳細</p>
        </animated.div>
        <div className="mx-auto h-full px-4">
          <p className="text-sm">{session?.description}</p>
        </div>
      </animated.div>

      <animated.div
        style={{ opacity: item.opacity }}
        className={modal({
          className: "bottom-4 bg-gray-600/60 pt-4",
        })}
        onClick={handleCloseModal}
      />
    </>
  );
};
