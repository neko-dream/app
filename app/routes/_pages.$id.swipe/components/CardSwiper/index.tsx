import { animated, to } from "@react-spring/web";
import { RiChat1Line } from "react-icons/ri";
import Card from "~/components/Card";
import { useSwipe } from "../../hooks/useSwipe";
import { animations } from "../../libs/animations";

const trans = (r: number, s: number) =>
  `rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

type Props = ReturnType<typeof useSwipe> & {
  itemLength: number;
};

export default function CardSwiper(props: Props) {
  return props.item?.map(({ x, y, w, h, left, rot, scale, zIndex }, i) => (
    <animated.div
      className="block absolute touch-none will-change-transform z-10"
      key={i}
      style={{ x, y, width: w, height: h, left, zIndex }}
    >
      <animated.div
        {...props.bind(i)}
        style={{ transform: to([rot, scale], trans) }}
        className="h-full w-full"
      >
        <Card
          title={"テスト"}
          description={"テスト本文です。"}
          user={{
            displayID: "",
            displayName: "ドチャクソ卍太郎",
            photoURL:
              "https://avatars.githubusercontent.com/u/135724197?s=96&v=4",
          }}
          opinionStatus="disagree"
          className="bg-white pointer-events-none select-none h-full w-full"
        />
      </animated.div>
      {!props.state.isOpinionModalOpen && (
        <button
          onClick={() => {
            props.state.setIsOpnionModalOpen(true);
            props.api.start((i) => {
              const current = props.itemLength - props.gone.size - 1;
              if (current !== i) return;
              return {
                ...animations.opinion(),
                rot,
                onRest: () => {
                  props.api.pause();
                },
              };
            });
          }}
          className="absolute flex items-center space-x-1 text-blue-500 bottom-4 right-4 border border-gray-600 p-1 rounded-full"
        >
          <RiChat1Line className="text-black" size={24} />
        </button>
      )}
    </animated.div>
  ));
}
