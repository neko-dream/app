import { Outlet } from "@remix-run/react";
import Layout from "./components/Layout";

export default function Route() {
  return (
    <div className="bg-[#e0efff]">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}
