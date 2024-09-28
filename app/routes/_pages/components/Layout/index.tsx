import { ReactNode } from "react";
import Avator from "~/components/Avator";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col bg-white">
      <div className="flex h-10 w-full items-center justify-between border-b-[1px] border-solid border-[#d6e3ed] px-4">
        <p>ことひら</p>
        <Avator src="https://example.com" className="h-8 w-8" />
      </div>
      {children}
    </div>
  );
}
