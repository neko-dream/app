import { animated } from "@react-spring/web";
import Button from "~/components/Button";
import Input from "~/components/Input";
import { useOpinonModalAnimation } from "../../animations/useOpinionModal";

type Props = {
  open: boolean;
  onOpenChange: () => void;
};

export const OpinionModal = ({ open, onOpenChange, ...props }: Props) => {
  const transition = useOpinonModalAnimation({ open });

  const handleCloseModal = () => onOpenChange();

  return transition((style, item) => {
    if (!item) {
      return;
    }

    return (
      <>
        <animated.div
          style={style}
          className="absolute bottom-0 h-[68%] w-[375px] bg-white z-30 border-t border-gray-200"
        >
          <div
            {...props}
            className="flex flex-col w-full h-full max-w-[375px] z-10 px-4"
          >
            <p className="my-4">意見投稿モーダル</p>
            <Input className="h-12 w-full px-4" />
            <Button
              onClick={handleCloseModal}
              variation="primary"
              className="mx-auto mt-auto mb-4"
            >
              閉じる
            </Button>
          </div>
        </animated.div>
        {/* <animated.div
          style={{ opacity: style.opacity }}
          className="w-[375px] top-0 absolute bg-slate-600/60 h-full"
          onClick={handleCloseModal}
        ></animated.div> */}
      </>
    );
  });
};
