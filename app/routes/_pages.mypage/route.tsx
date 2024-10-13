import { Outlet } from "@remix-run/react";

export { ErrorBoundary } from "./modules/ErrorBoundary";

export default function Route() {
  return <Outlet />;
}
