import { Outlet, useLoaderData } from "@remix-run/react";
import Avator from "~/components/Avator";
import Heading from "~/components/Heading";
import { SessionRouteContext } from "~/feature/session/context";
import { loader } from "./modules/loader";

export { ErrorBoundary } from "./modules/ErrorBoundary";
export { loader };

export default function Route() {
  const { session } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="shrink-0 flex h-[96px] flex-col justify-between p-3 pl-4">
        <p className="text-sm text-[#6d6c6a]">テーマ</p>
        <p>{session.theme}</p>
        <div className="flex items-center space-x-1">
          <Avator src={session.owner.iconURL} className="h-6 w-6" />
          <p className="text-sm text-[#6d6c6a]">{session.owner.displayName}</p>
        </div>
      </div>
      <Heading>みんなの意見、どう思う？</Heading>

      <Outlet context={{ session } satisfies SessionRouteContext} />
    </>
  );
}
