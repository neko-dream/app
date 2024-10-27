import { useSpring } from "react-spring";
import { useGesture } from "react-use-gesture";

type Props = {
  onCloseModal: () => void;
};

export const useOpinonModal = ({ onCloseModal }: Props) => {
  const [item, api] = useSpring(() => ({
    from: {
      opacity: 0.2,
      y: 800,
    },
    enter: {
      opacity: 1,
      y: 0,
    },
    leave: {
      opacity: 0,
      y: 800,
    },
  }));

  const bind = useGesture({
    onDrag: ({ down, movement: [, my] }) => {
      api.start(() => {
        if (!down) {
          if (200 < my) {
            onCloseModal();
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
          },
        };
      });
    },
  });

  return {
    item,
    api,
    bind,
  };
};
