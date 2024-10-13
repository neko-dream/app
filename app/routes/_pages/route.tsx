import {
  Await,
  Link,
  Outlet,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avator from "~/components/Avator";
import { loader } from "./modules/loader";

export { loader };

export default function Route() {
  const { $user } = useLoaderData<typeof loader>();
  const { pathname } = useLocation();

  return (
    <div className="bg-[#e0efff]">
      <div className="mx-auto flex min-h-screen max-w-sm flex-col bg-white pb-16">
        <div className="flex h-10 w-full items-center justify-between border-b-[1px] border-solid border-[#d6e3ed] px-4">
          <Link to={"/"}>Kotohiro</Link>

          {/* MEMO: トップページでは表示させない、ログインボタンが存在するため */}
          {pathname !== "/" && (
            <Suspense>
              <Await resolve={$user}>
                {(user) => {
                  if (user?.isVerify) {
                    return (
                      <Avator src={user?.iconURL || ""} className="h-8 w-8" />
                    );
                  }
                }}
              </Await>
            </Suspense>
          )}
        </div>
        <Outlet />
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
