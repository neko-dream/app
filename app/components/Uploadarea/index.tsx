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
          className="border border-gray-300 rounded-md"
        />
      ) : (
        <div className="flex items-center justify-center border border-gray-300 rounded-md w-full h-full">
          <RiImage2Line className="text-gray-500" size={20} />
        </div>
      )}
    </button>
  );
}
