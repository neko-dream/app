import { animated } from "@react-spring/web";
import { useEffect, useState } from "react";
import { useGesture } from "react-use-gesture";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Label from "~/components/Label";
import Textarea from "~/components/Textarea";
import { useOpinonModalAnimation } from "../../hooks/useOpinionModal";

type Props = {
  open: boolean;
  onOpenChange: (state: string | null) => void;
};

export const OpinionModal = ({ open, onOpenChange, ...props }: Props) => {
  const [item, api] = useOpinonModalAnimation();
  const [opinionState, setOpinionState] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      api.start({ opacity: 1, y: 0 });
    } else {
      api.start({ opacity: 1, y: 800 });
    }
    setOpinionState(null);
  }, [api, open]);

  const handleCloseModal = () => {
    onOpenChange(opinionState);
  };

  const handleClick = (v: string) => {
    setOpinionState((prev) => {
      if (prev === v) {
        return null;
      }
      return v;
    });
  };

  const bind = useGesture({
    onDrag: ({ down, movement: [, my] }) => {
      api.start(() => {
        if (!down) {
          if (200 < my) {
            handleCloseModal();
            return {
              opacity: 0,
              y: 500,
            };
          } else {
            return {
              y: 0,
            };
          }
        }

        return {
          to: {
            y: my > 0 ? my : 0,
            duration: 0,
          },
        };
      });
    },
  });

  return (
    <>
      <animated.div
        style={item}
        className="touch-none absolute will-change-transform bottom-0 h-[80%] w-[375px] bg-white z-30 border-t border-gray-200 rounded-t-xl"
      >
        <div
          {...props}
          className="flex flex-col space-y-4 w-full h-full max-w-[375px] z-10 px-4"
        >
          <animated.div
            {...bind()}
            className="cursor-pointer w-full mx-auto pb-4 pt-2"
          >
            <div className="h-1 w-[50%] bg-slate-400 mx-auto rounded-full" />
          </animated.div>
          <p className="mx-auto !my-0 select-none">あなたはどう思う？</p>
          <div className="flex justify-center space-x-2">
            <Button
              variation={opinionState !== "disagree" ? "pass" : "disagree"}
              onClick={() => handleClick("disagree")}
            >
              違うかも
            </Button>
            <Button
              variation={opinionState !== "pass" ? "pass" : "pass"}
              onClick={() => handleClick("pass")}
            >
              保留
            </Button>
            <Button
              variation={opinionState !== "agree" ? "pass" : "agree"}
              onClick={() => handleClick("agree")}
            >
              良さそう
            </Button>
          </div>
          <Label title="タイトル" optional>
            <Input className="h-12 w-full px-4" />
          </Label>
          <Label title="意見" optional>
            <Textarea />
          </Label>
          <Label title="参考文献" optional>
            <Input className="h-12 w-full px-4" />
          </Label>
          <Button
            onClick={handleCloseModal}
            variation="primary"
            className="mx-auto !mt-auto !mb-8"
          >
            送信する
          </Button>
        </div>
      </animated.div>

      {open && (
        <animated.div
          style={{ opacity: item.opacity, y: -96 }}
          className="w-[375px] top-0 absolute bg-slate-600/60 h-screen z-10"
          onClick={handleCloseModal}
        ></animated.div>
      )}
    </>
  );
};
