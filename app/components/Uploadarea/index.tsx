import { ComponentProps } from "react";
import { RiImage2Line } from "react-icons/ri";
import { tv } from "tailwind-variants";

type Props = ComponentProps<"button"> & {
  className?: string;
  preview?: string;
};

const uploadarea = tv({
  base: "h-[100px] w-[100px]",
});

export default function Uploadarea({ className, preview, ...props }: Props) {
  return (
    <button {...props} className={uploadarea({ className })} type="button">
      {preview ? (
        <img
          src={preview}
          alt=""
          className="rounded-md border border-gray-300"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-md border border-gray-300">
          <RiImage2Line className="text-gray-500" size={20} />
        </div>
      )}
    </button>
  );
}
