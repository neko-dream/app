import { useRef } from "react";
import { RiImage2Line } from "react-icons/ri";

type Props = {
  onUpload: (fileList: FileList | null) => void;
  className?: string;
};

export default function UploadArea({ onUpload, className }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    ref.current?.click();
  };

  return (
    <button
      onClick={handleClick}
      className={`flex h-20 w-24 items-center justify-center rounded-md border border-gray-300 ${className}`}
    >
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
