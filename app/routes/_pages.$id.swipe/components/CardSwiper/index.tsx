import { animated, to } from "@react-spring/web";
import { RiChat1Line } from "react-icons/ri";
import Card from "~/components/Card";
import { useSwipe } from "../../hooks/useSwipe";
import { animations } from "../../libs/animations";

const trans = (r: number, s: number) =>
  `rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

type Props = ReturnType<typeof useSwipe>;

export default function CardSwiper(props: Props) {
  return props.item?.map(({ x, y, w, h, left, rot, scale, zIndex }, i) => (
    <animated.div
      className="block absolute touch-none will-change-transform"
      key={i}
      style={{ x, y, width: w, height: h, left, zIndex }}
    >
      <animated.div
        {...props.bind(i)}
        style={{ transform: to([rot, scale], trans) }}
        className="h-full w-full"
      >
        <Card
          title={props.opinions[i].opinion.title || ""}
          description={props.opinions[i].opinion.content || ""}
          user={{
            displayID: "",
            displayName: props.opinions[i].user.displayName || "",
            photoURL: props.opinions[i].user.iconURL || "",
          }}
          opinionStatus={props.opinions[i].opinion.voteType!}
          className="bg-white pointer-events-none select-none h-full w-full"
        />
      </animated.div>
      {!props.state.isOpinionModalOpen && (
        <button
          onClick={() => {
            props.state.setIsOpnionModalOpen(true);
            props.api.start((i) => {
              const current = props.item.length - props.gone.size - 1;
              if (current !== i) return;
              return {
                ...animations.opinion(),
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
