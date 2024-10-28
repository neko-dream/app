import { animated, to } from "@react-spring/web";
import { RiChat1Line } from "react-icons/ri";
import Card from "~/components/Card";
import { useSwipe } from "../../hooks/useSwipe";
import { animations } from "../../libs/animations";

const trans = (r: number, s: number) =>
  `rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

type Props = ReturnType<typeof useSwipe>;

export default function CardSwiper(props: Props) {
  return props.item?.map(
    (
      {
        x,
        y,
        w,
        h,
        left,
        rot,
        scale,
        zIndex,
        backgroundColor,
        disagreeDisplay,
        agreeDisplay,
        opacity,
      },
      i,
    ) => {
      return (
        <animated.div
          className="absolute block touch-none will-change-transform"
          key={i}
          style={{
            x,
            y,
            width: w,
            height: h,
            left,
            zIndex,
          }}
        >
          <animated.div
            {...props.bind(i)}
            style={{ transform: to([rot, scale], trans) }}
            className="h-full w-full"
          >
            {/* 重なり */}
            <animated.div
              style={{
                backgroundColor,
                display: disagreeDisplay,
                opacity,
              }}
              className="absolute h-full w-full rounded"
            />
            <animated.p
              style={{ display: disagreeDisplay }}
              className="absolute w-full select-none p-4 text-end text-2xl font-bold text-white"
            >
              違うかも
            </animated.p>

            <animated.div
              style={{
                backgroundColor,
                display: agreeDisplay,
                opacity,
              }}
              className="absolute h-full w-full rounded"
            />
            <animated.p
              style={{ display: agreeDisplay }}
              className="absolute w-full select-none p-4 text-2xl font-bold text-white"
            >
              いいかも
            </animated.p>

            <Card
              title={props.opinions[i].opinion.title || ""}
              description={props.opinions[i].opinion.content || ""}
              user={{
                displayID: "",
                displayName: props.opinions[i].user.displayName || "",
                iconURL: props.opinions[i].user.iconURL || "",
              }}
              opinionStatus={props.opinions[i].opinion.voteType!}
              className="pointer-events-none h-full w-full select-none bg-white"
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
              className="absolute bottom-4 right-4 flex items-center space-x-1 rounded-full border border-gray-600 p-1 text-blue-500"
            >
              <RiChat1Line className="text-black" size={24} />
            </button>
          )}
        </animated.div>
      );
    },
  );
}
