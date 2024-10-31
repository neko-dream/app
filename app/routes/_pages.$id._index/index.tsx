import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Card from "~/components/Card";
import Heading from "~/components/Heading";
import { components } from "~/libs/api/openapi";
import Graph from "./components/Graph";
import { loader } from "./modules/loader";
import { SessionRouteContext } from "../_pages.$id/types";
import { JST } from "~/libs/date";

export { loader };

type Card = {
  opinion: components["schemas"]["opinion"];
  user: components["schemas"]["user"];
};

type TimelineItem = {
  actionItem: components["schemas"]["actionItem"];
}

export default function Page() {
  const {
    data,
    opinions: allOpinions,
    report,
    actionItems,
  } = useLoaderData<typeof loader>();
  const { session } = useOutletContext<SessionRouteContext>();

  const [groupID, setGroupID] = useState<number>(1000);
  const [opinions, setOpinions] = useState<Card[]>([]);
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    {
      actionItem: {
        ActionItemID: "1",
        Sequence: 1,
        Content: "議論開始",
        CreatedAt: "2021-10-01T00:00:00Z",
        UpdatedAt: "2021-10-01T00:00:00Z",
        Status: "完了"
      },
    },
    {
      actionItem: {
        ActionItemID: "1",
        Sequence: 1,
        Content: "議論開始",
        CreatedAt: "2021-10-01T00:00:00Z",
        UpdatedAt: "2021-10-01T00:00:00Z",
        Status: "完了"
      },
    },
  ]);

  useEffect(() => {
    if (groupID === 1000) {
      setOpinions(allOpinions?.opinions || []);
    } else {
      const opinions = data?.groupOpinions.filter((opinion) => {
        return opinion.groupId === groupID;
      });
      setOpinions(opinions?.[0]?.opinions || []);
    }

    if (isFinished) {
      const items = actionItems?.items.map((item) => {
        return {
          actionItem: item,
        };
      });
      setTimelineItems(items || []);
    }
  }, [data?.groupOpinions, groupID, allOpinions?.opinions, actionItems?.items]);

  // セッションが終了しているかどうかのフラグ
  const isFinished = JST(session.scheduledEndTime).isBefore();

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

      <Heading>意見グループ</Heading>
      <Graph
        polygons={positions}
        positions={data?.positions}
        myPosition={data?.myPosition}
        selectGroupId={(id: number) => {
          setGroupID(id);
        }}
      />
      {isFinished && timelineItems.length > 0 &&
        <>
          <Heading>タイムライン</Heading>
          <div className="relative px-4">
            <div className="h-full border-l py-1 border-opacity-20 border-secondary">
              {timelineItems.map((item, i) => {
                return <TimelineItem key={i} actionItem={item.actionItem} />;
              })}
            </div>
          </div>
        </>
      }
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

function TimelineItem({ actionItem }: TimelineItem) {
  return (
    <div className="flex items-center w-full my-6 -ml-2">
      <div className="w-1/12 z-10">
        <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
      </div>
      <div className="flex w-full justify-between	">
        <div className="">
          {actionItem.Content}
        </div>
        <span>{actionItem.Status}</span>
      </div>
    </div>
  );
}
