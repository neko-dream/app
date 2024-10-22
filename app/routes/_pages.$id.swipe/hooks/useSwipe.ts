import { useState } from "react";
import { useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import { components } from "~/libs/api/openapi";
import { animations } from "../libs/animations";

type Props = {
  cards: {
    opinion: components["schemas"]["opinion"];
    user: components["schemas"]["user"];
    replyCount: number;
  }[];
};

export const useSwipe = ({ cards }: Props) => {
  const [gone] = useState(() => new Set<number>());
  const [isOpinionModalOpen, setIsOpnionModalOpen] = useState(false);
  const [item, api] = useSprings(cards.length, (i) => ({
    ...animations.to(),
    y: i * 6,
    delay: i * 50,
    from: animations.from(),
  }));

  const bind = useDrag(
    ({ args: [index], down, movement: [mx, my], velocity }) => {
      // MEMO: 意見モーダルが開いている時はカードを動かさない
      if (isOpinionModalOpen) {
        return;
      }

      const trigger = velocity > 0.1;
      // MEMO: 閾値を超えたらスワイプしたとみなす
      const xdir = mx > 100 ? 1 : mx < -100 ? -1 : 0;
      const ydir = my > 100 ? 1 : my < -100 ? -1 : 0;

      api.start((i) => {
        // MEMO: ydir || xidr が 0 でない場合はどこかにスワイプしている
        if (!down && trigger && (ydir !== 0 || xdir !== 0)) {
          if (ydir !== -1) {
            gone.add(index);
          }
        }

        if (i !== index) return;

        const isGone = gone.has(index);
        // MEMO: スワイプしたカードの位置を計算
        const x = isGone ? (200 + window.innerWidth) * xdir : down ? mx : 0;
        const y = isGone ? (200 + window.innerHeight) * ydir : down ? my : 0;
        const rot = down ? mx / 100 + (isGone ? xdir * 10 * velocity : 0) : 0;

        if (isGone) {
          if (100 < mx) {
            // setText("右にスワイプした");
          } else if (mx < -100) {
            // setText("左にスワイプした");
          }

          if (100 < my) {
            // setText("下にスワイプした");
          }
        }

        const config = {
          friction: 50,
          tension: down ? 800 : isGone ? 200 : 500,
        };

        if (!down && my < -100) {
          setIsOpnionModalOpen(true);

          return {
            ...animations.opinion(),
            rot,
            config,
            onRest: () => {
              api.pause();
            },
          };
        }

        return {
          ...animations.init(),
          y: y + i * 6,
          x: x,
          rot,
          config,
        };
      });

      if (!down && gone.size === cards.length) {
        // setText("終了");
      }
    },
  );

  return {
    gone,
    item,
    api,
    bind,
    state: {
      isOpinionModalOpen,
      setIsOpnionModalOpen,
    },
  };
};
