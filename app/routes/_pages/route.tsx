import { Outlet } from "@remix-run/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avator from "~/components/Avator";

export default function Route() {
  return (
    <div className="bg-[#e0efff]">
      <div className="mx-auto flex min-h-screen max-w-sm flex-col bg-white pb-16">
        <div className="flex h-10 w-full items-center justify-between border-b-[1px] border-solid border-[#d6e3ed] px-4">
          <p>ことひら</p>
          <Avator src="https://example.com" className="h-8 w-8" />
        </div>
        <Outlet />
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
