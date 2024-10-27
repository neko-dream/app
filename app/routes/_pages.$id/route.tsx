import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { RiChat1Line } from "react-icons/ri";
import Avator from "~/components/Avator";
import Heading from "~/components/Heading";
import { SessionRouteContext } from "~/feature/session/context";
import { OpinionModal } from "./components/OpinonModal";
import { loader } from "./modules/loader";

const regexSwipe = /^\/[^/]+\/swipe$/;
const regexReply = /^\/[^/]+\/(?!swipe$)[^/]+$/;
const regexHome = /^\/[^/]+$/;

export { ErrorBoundary } from "./modules/ErrorBoundary";
export { loader };

export default function Route() {
  const { session } = useLoaderData<typeof loader>();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = useLocation().pathname;
  const isSwipePage = regexSwipe.test(pathname);
  const isReplyPage = regexReply.test(pathname);
  const isHomePage = regexHome.test(pathname);

  // MEMO: モーダルが開いている間はスクロール禁止する
  const noscroll = (e: Event) => e.preventDefault();

  useEffect(() => {
    if (isOpen) {
      window.scrollTo(0, 0);
      document.addEventListener("touchmove", noscroll, { passive: false });
      document.addEventListener("wheel", noscroll, { passive: false });
    }
    return () => {
      document.removeEventListener("touchmove", noscroll);
      document.removeEventListener("wheel", noscroll);
    };
  }, [isOpen]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="relative">
        <div className="shrink-0 flex h-[112px] flex-col p-3 pl-4 mt-8">
          <p className="text-sm text-[#6d6c6a]">テーマ</p>
          <p>{session.theme}</p>
          <div className="flex items-center space-x-1">
            <Avator src={session.owner.iconURL} className="h-6 w-6" />
            <p className="text-sm text-[#6d6c6a]">
              {session.owner.displayName}
            </p>
          </div>
        </div>

        {isSwipePage && (
          <Link
            to={`/${session.id}`}
            className="absolute top-2 right-2 text-blue-500 underline"
            onClick={() => setIsOpen(false)}
          >
            みんなの意見を見る {"->"}
          </Link>
        )}

        {isReplyPage && (
          <Link
            to={`/${session.id}`}
            className="absolute top-2 left-2 text-blue-500 underline"
            onClick={() => setIsOpen(false)}
          >
            {"<-"} みんなの意見を見る
          </Link>
        )}

        {isHomePage && (
          <Link
            to={`/${session.id}/swipe`}
            className="absolute top-2 left-2 text-blue-500 underline"
            onClick={() => setIsOpen(false)}
          >
            {"<-"} スワイプ画面にもどる
          </Link>
        )}

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
