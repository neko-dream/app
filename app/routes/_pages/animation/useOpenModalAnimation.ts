import { useTransition } from "react-spring";

type Props = {
  open: boolean;
};

export const useOpenModalAnimation = ({ open }: Props) => {
  const transition = useTransition(open, {
    from: {
      opacity: 0.2,
      transform: "translateY(-100px)",
    },
    enter: {
      opacity: 1,
      transform: "translateY(0px)",
      config: {
        duration: 100,
      },
    },
    leave: {
      opacity: 0,
      transform: "translateY(-100px)",
      config: {
        duration: 100,
      },
    },
  });

  return transition;
};
