// eslint-disable-next-line @typescript-eslint/no-unused-vars
const height = "calc(100% - 136px - 24px)";

export const animations = {
  to: () => ({
    w: "80%",
    h: "300px",
    x: 0,
    zIndex: 0,
    left: "10%",
    scale: 1,
  }),
  from: () => ({
    w: "100%",
    h: "300px",
    x: 0,
    y: -1000,
    zIndex: 0,
    left: "10%",
    rot: 0,
    scale: 1.5,
    backgroundColor: "transparent",
    agreeDisplay: "none",
    disagreeDisplay: "none",
    opacity: 0,
  }),
  opinion: () => {
    return {
      w: "95%",
      h: "180px",
      y: -140,
      x: 0,
      left: "2.5%",
      zIndex: 100,
      delay: undefined,
    };
  },
  init: () => ({
    w: "80%",
    h: "300px",
    x: 0,
    left: "10%",
    zIndex: 0,
    delay: undefined,
  }),
};
