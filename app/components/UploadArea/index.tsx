import { useRef } from "react";
import { RiImage2Line } from "react-icons/ri";
import { tv } from "tailwind-variants";

type Props = {
  onUpload: (fileList: FileList | null) => void;
  className?: string;
};

const uploadArea = tv({
  base: "flex h-20 w-24 items-center justify-center rounded-md border border-gray-300",
});

export default function UploadArea({ onUpload, className }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    ref.current?.click();
  };

  return (
    <button onClick={handleClick} className={uploadArea({ class: className })}>
      <RiImage2Line className="text-gray-500" size={20} />
      <input
        type="file"
        hidden
        ref={ref}
        onChange={(e) => onUpload(e.currentTarget.files)}
      />
    </button>
  );
}
