import { Await, Link, Outlet, useLoaderData } from "@remix-run/react";
import { Suspense, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PenIcon from "~/assets/pen.svg";
import SearchIcon from "~/assets/search.svg";
import Avator from "~/components/Avator";
import { SearchMenuDialog } from "./components/SearchMenuDialog";
import { loader } from "./modules/loader";

export { ErrorBoundary } from "./modules/ErrorBoundary";
export { loader };

export default function Route() {
  const { $user } = useLoaderData<typeof loader>();
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);

  const handleClose = () => {
    setIsSearchMenuOpen(false);
  };

  const handleOpenChange = () => {
    setIsSearchMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="z-20 flex h-10 w-full shrink-0 items-center justify-between space-x-6 border-b-[1px] border-solid border-[#d6e3ed] bg-white px-4">
        <Link to="/home" className="mr-auto">
          ことひろ
        </Link>

        <button onClick={handleOpenChange}>
          <img src={SearchIcon} alt="" loading="lazy" />
        </button>

        <Suspense>
          <Await resolve={$user}>
            {(user) => {
              if (!user) {
                return null;
              }

              return (
                <>
                  <Link to={"/create"} onClick={handleClose}>
                    <img src={PenIcon} alt="" loading="lazy" />
                  </Link>
                  <Link to={"/mypage"} onClick={handleClose}>
                    <Avator src={user?.iconURL || ""} className="h-8 w-8" />
                  </Link>
                </>
              );
            }}
          </Await>
        </Suspense>
      </header>
      <Outlet />

      {/* 常時表示はされない */}
      <ToastContainer position="top-center" />
      <SearchMenuDialog
        open={isSearchMenuOpen}
        onOpenChange={setIsSearchMenuOpen}
      />
    </>
  );
}
