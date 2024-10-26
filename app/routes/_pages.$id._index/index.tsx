import { useLoaderData, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Card from "~/components/Card";
import Heading from "~/components/Heading";
import { components } from "~/libs/api/openapi";
import Graph from "./components/Graph";
import { loader } from "./modules/loader";

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

  const params = useParams();
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
      />
      <Heading className="mt-6">レポート</Heading>
      <details className="prose-sm px-2">
        <summary className="pt-4">レポートを見る</summary>
        <ReactMarkdown className="pt-4">{report?.report}</ReactMarkdown>
      </details>
      <Heading className="mt-6">みんなの意見</Heading>
      <select
        className="h-6 w-32 m-2 border border-gray-300 rounded-full py-0.5 px-2 text-xs"
        onChange={(e) => {
          setGroupID(Number(e.currentTarget.value));
        }}
      >
        <option value={1000}>すべて</option>
        {data?.groupOpinions.map((opinion, i) => {
          return (
            <option key={i} value={opinion.groupId}>
              グループ {opinion.groupId}
            </option>
          );
        })}
      </select>
      <div className="mx-4 space-y-4">
        {opinions.map((opinion, i) => {
          return (
            <Card
              key={i}
              title={opinion.opinion.title || ""}
              description={opinion.opinion.content || ""}
              user={{
                displayID: "",
                displayName: opinion.user.displayName || "",
                photoURL: opinion.user.iconURL || "",
              }}
              opinionStatus={opinion.opinion.voteType!}
              isOpnionLink={`/${params.id}/${opinion.opinion.id}`}
            />
          );
        })}
      </div>
    </>
  );
}
