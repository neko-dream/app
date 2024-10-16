import { Await, Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { Suspense } from "react";
import Heading from "~/components/Heading";
import Session from "~/components/Session";
import Tabs from "~/components/Tabs";
import { loader } from "./modules/loader";

export { loader };

export default function Page() {
  const { $session } = useLoaderData<typeof loader>();
  const [params] = useSearchParams();
  const isFinished = params.get("q") === "finished";

  return (
    <>
      <Heading className="shrink-0 h-10">投稿されたセッション</Heading>
      <Tabs
        items={[
          { label: "開催中", href: "/home" },
          { label: "終了", href: "/home?q=finished" },
        ]}
        active={isFinished ? "終了" : "開催中"}
        className="shrink-0"
      />
      <div className="space-y-2 bg-gray-100 h-max pt-2 overflow-y-scroll">
        <Suspense>
          <Await resolve={$session}>
            {(data) => {
              return data?.talkSessions.map((session, i) => (
                <Link
                  to={`/${session.talkSession.id}/swipe`}
                  className="block"
                  key={i}
                >
                  <Session {...session} />
                </Link>
              ));
            }}
          </Await>
        </Suspense>
      </div>
    </>
  );
}
