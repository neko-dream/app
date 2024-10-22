import { easings, useSpring } from "react-spring";

export const useOpinonModalAnimation = () => {
  return useSpring(() => ({
    from: {
      opacity: 0.2,
      y: 800,
    },
    enter: {
      opacity: 1,
      y: 0,
      config: {
        duration: 400,
        easing: easings.easeInOutExpo,
      },
    },
    leave: {
      opacity: 0,
      y: 800,
      config: {
        duration: 200,
        easing: easings.easeInOutExpo,
      },
    },
  }));
};