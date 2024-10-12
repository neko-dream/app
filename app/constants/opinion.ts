export const OpinionJpMap = {
  agree: "賛成",
  disagree: "反対",
  pass: "保留",
} as const;

/**
 * tailwindcss class
 */
export const OpinionColor = {
  agree: {
    bg: "bg-blue-500",
    border: "border-blue-500",
  },
  disagree: {
    bg: "bg-red-500",
    border: "border-red-500",
  },
  pass: {
    bg: "bg-gray-300",
    border: "border-gray-300",
  },
} as const;
