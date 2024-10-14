import { ComponentProps, ForwardedRef, forwardRef, ReactNode } from "react";
import { RiAlertFill } from "react-icons/ri";
import { tv } from "tailwind-variants";
import Tip from "../Tip";

type Props = ComponentProps<"div"> & {
  title: string;
  children: ReactNode;
  required?: boolean;
  optional?: boolean;
  errors?: string[];
};

const label = tv({
  base: "space-y-1 w-full",
});

function Label(
  { children, title, required, optional, errors, className, ...props }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div {...props} className={label({ className })} ref={ref}>
      <div className="flex items-center space-x-1 mb-1">
        <p className="text-xs">{title}</p>
        <Tip required={required} optional={optional} />
      </div>
      {children}
      {errors?.map((v, i) => {
        return (
          <div key={i} className="flex items-center space-x-1">
            <RiAlertFill color="red" />
            <p className="text-red-500 text-xs pt-0.5">{v}</p>
          </div>
        );
      })}
    </div>
  );
}

export default forwardRef(Label);
