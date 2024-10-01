import { tv } from "tailwind-variants";

type Tip = "optional" | "required";

type Props = {
  label: string;
  className?: string;
  required?: boolean;
  optional?: boolean;
};

const card = tv({
  slots: {
    tip: "w-8 rounded-md text-center text-xs text-white",
  },
  variants: {
    optional: { true: { tip: "bg-gray-500" } },
    required: { true: { tip: "bg-red-500" } },
  } satisfies { [x in Tip]: object },
});

export default function Label({
  className,
  label,
  required = false,
  optional = false,
}: Props) {
  const { tip: tipTv } = card();

  return (
    <div
      className={`flex items-center space-x-1 rounded-md text-sm ${className}`}
    >
      <p className="text-[#6d6c6a]">{label}</p>
      {optional && <p className={tipTv({ optional: true })}>任意</p>}
      {required && <p className={tipTv({ required: true })}>必須</p>}
    </div>
  );
}
