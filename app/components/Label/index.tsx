type Props = {
  label: string;
  className?: string;
  tip?: "optional" | "required";
};

const tipMap = {
  required: {
    title: "必須",
    className: "bg-red-500",
  },
  optional: {
    title: "任意",
    className: "bg-gray-500",
  },
} as const;

export default function Label({ className, label, tip }: Props) {
  return (
    <div
      className={`flex items-center space-x-1 rounded-md text-sm ${className}`}
    >
      <p className="text-[#6d6c6a]">{label}</p>

      {(() => {
        if (!tip) return;

        const { title, className } = tipMap[tip];

        return (
          <p
            className={`w-8 rounded-md text-center text-xs text-white ${className}`}
          >
            {title}
          </p>
        );
      })()}
    </div>
  );
}
