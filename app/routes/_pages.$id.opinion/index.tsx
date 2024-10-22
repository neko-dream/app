import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { button } from "~/components/Button";
import Card from "~/components/Card";
import Heading from "~/components/Heading";
import { components } from "~/libs/api/openapi";
import { scrolled } from "~/variants/scrolled-component";
import { loader } from "./modules/loader";

export { loader };

type Card = {
  opinion: components["schemas"]["opinion"];
  user: components["schemas"]["user"];
};

export default function Page() {
  const { data } = useLoaderData<typeof loader>();
  const [groupID, setGroupID] = useState<number>(0);
  const [opinions, setOpinions] = useState<Card[]>([]);

  useEffect(() => {
    const opinions = data?.groupOpinions.filter((opinion) => {
      return opinion.groupId === groupID;
    });
    setOpinions(opinions?.[0]?.opinions || []);
  }, [data?.groupOpinions, groupID]);

  return (
    <>
      <Heading>あなたの意見</Heading>
      <Link
        to={"../post"}
        className={button({
          color: "primary",
          className: "block mx-auto mt-6",
        })}
      >
        意見を投稿する
      </Link>
      <Heading className="mt-6">あなたのポジション</Heading>
      グラフがある
      <Heading className="mt-6">みんなの意見</Heading>
      <select
        className="h-6 w-32 m-2 border border-gray-300 rounded-full py-0.5 px-2 text-xs"
        onChange={(e) => {
          setGroupID(Number(e.currentTarget.value));
        }}
      >
        {data?.groupOpinions.map((opinion, i) => {
          return (
            <option key={i} value={opinion.groupId}>
              グループ {opinion.groupId}
            </option>
          );
        })}
      </select>
      <div className={scrolled({ class: "mx-4 space-y-4" })}>
        {opinions.map((opinion, i) => {
          return (
            <Card
              key={i}
              title="過言では？"
              description="確かにいい感じだが、完全に習得するのに学習コストがかかるので、すべてのアプリに適応するのは難しいかも"
              user={{
                displayID: "",
                displayName: "山田太郎マン",
                photoURL:
                  "https://avatars.githubusercontent.com/u/135724197?s=96&v=4",
              }}
              opinionStatus="disagree"
            />
          );
        })}
      </div>
    </>
  );
}
