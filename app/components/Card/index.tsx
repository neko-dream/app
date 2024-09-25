import { ComponentProps, ForwardedRef, forwardRef } from "react";
import Avator from "../Avator";
import Badge from "../Badge";

type Props = Card & ComponentProps<"div">;

type Card = {
  title: string;
  description: string;
};

function Card({ ...props }: Props, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div
      {...props}
      ref={ref}
      className="rounded-md border border-solid border-black p-4"
    >
      <Avator />
      <p>{props.title}</p>
      <p>{props.description}</p>
      <Badge status="" />
    </div>
  );
}

export default forwardRef(Card);
