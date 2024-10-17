import { useState } from "react";
import { SpringRef, SpringValue, useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import { ReactEventHandlers } from "react-use-gesture/dist/types";

export type useSwipeHook = {
  item: Item;
  api: Api;
  bind: (...args: number[]) => ReactEventHandlers;
};

type Api = SpringRef<{
  x: number;
  rot: number;
  y: number;
  scale: number;
}>;

type Item = {
  x: SpringValue<number>;
  rot: SpringValue<number>;
  y: SpringValue<number>;
  scale: SpringValue<number>;
}[];

const cards = [
  "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
];

const to = (i: number) => ({
  x: 0,
  y: i * 6,
  scale: 1,
  delay: i * 50,
});

const from = () => ({ x: 0, rot: 0, y: -1000, scale: 1.5 });

export const useSwipe = (): useSwipeHook => {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [item, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(),
  }));

  const bind = useDrag(
    ({ args: [index], down, movement: [mx, my], velocity }) => {
      const trigger = velocity > 0.1; // If you flick hard enough it should trigger the card to fly out
      let xdir = 0;
      if (100 < mx) {
        xdir = 1;
      } else if (mx < -100) {
        xdir = -1;
      }

      let ydir = 0;
      if (100 < my) {
        ydir = 1;
      } else if (my < -100) {
        ydir = -1;
      }

      api.start((i) => {
        if (!down && trigger && (ydir !== 0 || xdir !== 0)) {
          gone.add(index);
        }

        if (i !== index) return;

        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * xdir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const y = isGone ? (200 + window.innerHeight) * ydir : down ? my : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = down ? mx / 100 + (isGone ? xdir * 10 * velocity : 0) : 0; // How much the card tilts, flicking it harder makes it rotate faster

        if (isGone) {
          if (100 < mx) {
            // setText("右にスワイプした");
          } else if (mx < -100) {
            // setText("左にスワイプした");
          }

          if (100 < my) {
            // setText("下にスワイプした");
          } else if (my < -100) {
            // setText("上にスワイプした");
          }
        }

        return {
          y: y + i * 6,
          x: x,
          rot,
          // scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length) {
        // setText("終了");
      }
    },
  );

  return {
    item,
    api,
    bind,
  };
};
