import { Await, Link, Outlet, useLoaderData } from "@remix-run/react";
import { Suspense, useEffect, useState } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpenSearchMenu = () => {
    setIsSearchMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    $user.then((v) => setIsLoggedIn(!!v));
  }, [$user]);

  return (
    <>
      <header className="flex h-10 w-full items-center justify-between border-b-[1px] border-solid border-[#d6e3ed] px-4 space-x-6 z-20">
        <Link to={isLoggedIn ? "/home" : "/"} className="mr-auto">
          Kotohiro
        </Link>

        <button onClick={handleOpenSearchMenu}>
          <img src={SearchIcon} alt="" loading="lazy" />
        </button>

        <Suspense>
          <Await resolve={$user}>
            {(user) => {
              if (!isLoggedIn) {
                return null;
              }

              return (
                <>
                  <Link to={"/create"}>
                    <img src={PenIcon} alt="" loading="lazy" />
                  </Link>
                  <Link to={isLoggedIn ? "/mypage" : "/"}>
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
        onChange={setIsSearchMenuOpen}
      />
    </>
  );
}
