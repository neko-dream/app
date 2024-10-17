import { animated, to } from "@react-spring/web";
import Card from "~/components/Card";
import { useSwipeHook } from "../../hooks/useSwipe";

const trans = (r: number, s: number) =>
  `rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

export default function CardSwiper(props: useSwipeHook) {
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return props.item?.map(({ x, y, rot, scale }, i) => (
    <animated.div
      className="block absolute touch-none will-change-transform h-[calc(100%-116px-40px)] w-[80%] left-[10%] z-10"
      key={i}
      style={{ x, y }}
    >
      <animated.div
        {...props.bind(i)}
        style={{ transform: to([rot, scale], trans) }}
        className="h-full"
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
    </animated.div>
  ));
}
