import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Card from "~/components/Card";
import Heading from "~/components/Heading";
import { components } from "~/libs/api/openapi";
import Graph from "./components/Graph";
import { loader } from "./modules/loader";
import { SessionRouteContext } from "../_pages.$id/types";

export { loader };

type Card = {
  opinion: components["schemas"]["opinion"];
  user: components["schemas"]["user"];
};

export default function Page() {
  const {
    data,
    opinions: allOpinions,
    report,
  } = useLoaderData<typeof loader>();
  const { session } = useOutletContext<SessionRouteContext>();

  const [groupID, setGroupID] = useState<number>(1000);
  const [opinions, setOpinions] = useState<Card[]>([]);

  useEffect(() => {
    if (groupID === 1000) {
      setOpinions(allOpinions?.opinions || []);
      return;
    }
    const opinions = data?.groupOpinions.filter((opinion) => {
      return opinion.groupId === groupID;
    });
    setOpinions(opinions?.[0]?.opinions || []);
  }, [data?.groupOpinions, groupID, allOpinions?.opinions]);

  // グループ３が一番意見多そうなので、グループ３の意見を取得
  // ついでにインデックス順にする
  const positions = data?.positions
    .filter((opinion) => {
      return (
        opinion.groupId === 3 &&
        (opinion.perimeterIndex || opinion.perimeterIndex === 0)
      );
    })
    .sort((a, b) => (a.perimeterIndex || 0) - (b.perimeterIndex || 0));

  return (
    <>
      <Graph
        polygons={positions}
        positions={data?.positions}
        myPosition={data?.myPosition}
        selectGroupId={(id: number) => {
          setGroupID(id);
        }}
      />
      <Heading>レポート</Heading>

      <details className="prose-sm px-2">
        <summary className="pt-4">レポートを見る</summary>
        <ReactMarkdown className="pt-4">{report?.report}</ReactMarkdown>
      </details>

      <Heading className="mt-4">みんなの意見</Heading>
      <div className="flex items-center">
        <div className="pl-3"></div>
        <p className="pt-0.5 text-xs">グループ：</p>
        <select
          className="mb-2 mt-2 h-6 w-32 rounded-full border border-gray-300 px-2 py-0.5 text-xs"
          onChange={(e) => {
            setGroupID(Number(e.currentTarget.value));
          }}
          value={groupID}
        >
          <option value={1000}>すべて</option>
          {data?.groupOpinions.map((opinion, i) => {
            return (
              <option key={i} value={opinion.groupId}>
                {opinion.groupName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mx-4 mb-16 space-y-4">
        {opinions.map((opinion, i) => {
          return (
            <Link
              key={i}
              to={`/${session.id}/${opinion.opinion.id}`}
              className="block"
            >
              <Card
                title={opinion.opinion.title || ""}
                description={opinion.opinion.content || ""}
                user={{
                  displayID: "",
                  displayName: opinion.user.displayName || "",
                  iconURL: opinion.user.iconURL || "",
                }}
                opinionStatus={opinion.opinion.voteType!}
                isOpnionLink={`/${session.id}/${opinion.opinion.id}`}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}
