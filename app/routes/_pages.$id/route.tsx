import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { RiChat1Line } from "react-icons/ri";
import { tv } from "tailwind-variants";
import Avator from "~/components/Avator";
import Heading from "~/components/Heading";
import { SessionRouteContext } from "~/feature/session/context";
import { OpinionModal } from "./components/OpinonModal";
import { loader } from "./modules/loader";

export { ErrorBoundary } from "./modules/ErrorBoundary";
export { loader };

const body = tv({
  variants: {
    open: { true: "overflow-hidden h-[calc(100vh-40px)]" },
  },
});

export default function Route() {
  const { session } = useLoaderData<typeof loader>();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={body({ open: isOpen })}>
      <div className="relative">
        <Link
          to={`/${session.id}`}
          onClick={() => {
            setIsOpen(false);
          }}
          className="shrink-0 flex h-[96px] flex-col justify-between p-3 pl-4"
        >
          <p className="text-sm text-[#6d6c6a]">テーマ</p>
          <p>{session.theme}</p>
          <div className="flex items-center space-x-1">
            <Avator src={session.owner.iconURL} className="h-6 w-6" />
            <p className="text-sm text-[#6d6c6a]">
              {session.owner.displayName}
            </p>
          </div>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="absolute flex items-center space-x-1 text-blue-500 bottom-4 right-4 border border-gray-600 p-1 rounded-full"
        >
          <RiChat1Line className="text-black" size={24} />
        </button>
      </div>
      <Heading>みんなの意見、どう思う？</Heading>

      <Outlet context={{ session } satisfies SessionRouteContext} />

      <OpinionModal
        open={isOpen}
        onOpenChange={() => {
          setTimeout(() => {
            setIsOpen(false);
          }, 500);
        }}
      />
    </div>
  );
}
