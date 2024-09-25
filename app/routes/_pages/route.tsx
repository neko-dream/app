import { Outlet } from "@remix-run/react";

export default function Route() {
  return (
    <div className="bg-[#e0efff]">
      <div className="flex flex-col mx-auto min-h-screen max-w-sm bg-white">
        <Outlet />
      </div>
    </div>
  );
}
