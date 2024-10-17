import { easings, useTransition } from "react-spring";

type Props = {
  open: boolean;
};

export const useOpinonModalAnimation = ({ open }: Props) => {
  const transition = useTransition(open, {
    from: {
      opacity: 0.2,
      transform: "translateY(500px)",
    },
    enter: {
      opacity: 1,
      transform: "translateY(0px)",
      config: {
        duration: 400,
        easing: easings.easeInOutExpo,
      },
    },
    leave: {
      opacity: 0,
      transform: "translateY(500px)",
      config: {
        duration: 200,
        easing: easings.easeInOutExpo,
      },
    },
  });

  return transition;
};
