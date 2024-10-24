export const OpinionJpMap = {
  agree: "違うかも",
  disagree: "保留",
  pass: "良さそう",
  uncategorized: "未分類",
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
