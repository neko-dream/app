import { Await, useLoaderData, useSearchParams } from "@remix-run/react";
import { Suspense } from "react";
import Heading from "~/components/Heading";
import Session from "~/components/Session";
import Tabs from "~/components/Tabs";
import { loader } from "./modules/loader";

export { headers } from "~/modules/header";
export { loader };

export default function Page() {
  const { $session } = useLoaderData<typeof loader>();
  const [params] = useSearchParams();
  const isFinished = params.get("q") === "finished";

  return (
    <div className="flex flex-col">
      <Heading className="h-10">投稿されたセッション</Heading>
      <Tabs
        items={[
          { label: "開催中", href: "/home" },
          { label: "終了", href: "/home?q=finished" },
        ]}
        active={isFinished ? "終了" : "開催中"}
      />
      <div className="space-y-2 bg-gray-100 h-full pt-2">
        <Suspense>
          <Await resolve={$session}>
            {({ talkSessions }) => {
              return talkSessions.map((session, i) => (
                <Session {...session} key={i} />
              ));
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
