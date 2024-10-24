import { Link, useLoaderData, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { button } from "~/components/Button";
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
  const { data, opinions: hoge } = useLoaderData<typeof loader>();
  // console.log(data);

  // const position = [
  //   {
  //     posX: -3.6698376913491835,
  //     posY: 0.39739609600245096,
  //     displayId: "user1",
  //     groupId: 1,
  //   },
  //   {
  //     posX: 2.6153163271059756,
  //     posY: 1.6132866310064822,
  //     displayId: "user2",
  //     groupId: 0,
  //   },
  //   {
  //     posX: 2.0799224990902117,
  //     posY: -2.1809130287056577,
  //     displayId: "user3",
  //     groupId: 2,
  //   },
  //   {
  //     posX: -3.669837691349186,
  //     posY: 0.39739609600245174,
  //     displayId: "user4",
  //     groupId: 1,
  //   },
  //   {
  //     posX: 1.789105829781852,
  //     posY: -2.3261408294092374,
  //     displayId: "user5",
  //     groupId: 2,
  //   },
  //   {
  //     posX: 2.615316327105975,
  //     posY: 1.6132866310064866,
  //     displayId: "user6",
  //     groupId: 0,
  //   },
  //   {
  //     posX: -3.669837691349186,
  //     posY: 0.39739609600245185,
  //     displayId: "user7",
  //     groupId: 1,
  //   },
  //   {
  //     posX: 1.789105829781852,
  //     posY: -2.3261408294092374,
  //     displayId: "user8",
  //     groupId: 2,
  //   },
  //   {
  //     posX: -3.669837691349186,
  //     posY: 0.39739609600245185,
  //     displayId: "user9",
  //     groupId: 1,
  //   },
  //   {
  //     posX: 2.6259945030038456,
  //     posY: 1.6341781853744355,
  //     displayId: "user10",
  //     groupId: 0,
  //   },
  //   {
  //     posX: -3.669837691349186,
  //     posY: 0.39739609600245185,
  //     displayId: "user11",
  //     groupId: 1,
  //   },
  //   {
  //     posX: -3.669837691349186,
  //     posY: 0.39739609600245185,
  //     displayId: "user12",
  //     groupId: 1,
  //   },
  //   {
  //     posX: -3.669837691349186,
  //     posY: 0.39739609600245185,
  //     displayId: "user13",
  //     groupId: 1,
  //   },
  //   {
  //     posX: -3.669837691349186,
  //     posY: 0.39739609600245185,
  //     displayId: "user14",
  //     groupId: 1,
  //   },
  //   {
  //     posX: -3.669837691349186,
  //     posY: 0.39739609600245185,
  //     displayId: "user15",
  //     groupId: 1,
  //   },
  //   {
  //     posX: -3.669837691349186,
  //     posY: 0.39739609600245185,
  //     displayId: "user16",
  //     groupId: 1,
  //   },
  //   {
  //     posX: -3.6698376913491866,
  //     posY: 0.39739609600245185,
  //     displayId: "user17",
  //     groupId: 1,
  //   },
  //   {
  //     posX: 2.6153163271059756,
  //     posY: 1.6132866310064864,
  //     displayId: "user18",
  //     groupId: 0,
  //   },
  //   {
  //     posX: 2.6153163271059756,
  //     posY: 1.6132866310064864,
  //     displayId: "user19",
  //     groupId: 0,
  //   },
  //   {
  //     posX: 2.6153163271059756,
  //     posY: 1.6132866310064864,
  //     displayId: "user20",
  //     groupId: 0,
  //   },
  //   {
  //     posX: 2.6153163271059756,
  //     posY: 1.6132866310064864,
  //     displayId: "user21",
  //     groupId: 0,
  //   },
  //   {
  //     posX: 2.6153163271059756,
  //     posY: 1.6132866310064864,
  //     displayId: "user22",
  //     groupId: 0,
  //   },
  //   {
  //     posX: 2.6153163271059756,
  //     posY: 1.6132866310064864,
  //     displayId: "user23",
  //     groupId: 0,
  //   },
  //   {
  //     posX: 2.6153163271059756,
  //     posY: 1.6132866310064864,
  //     displayId: "user24",
  //     groupId: 0,
  //   },
  //   {
  //     posX: 2.6153163271059756,
  //     posY: 1.6132866310064864,
  //     displayId: "user25",
  //     groupId: 0,
  //   },
  //   {
  //     posX: 1.5006542770381734,
  //     posY: -2.46765540652277,
  //     displayId: "user126",
  //     groupId: 2,
  //   },
  //   {
  //     posX: 1.5006542770381734,
  //     posY: -2.46765540652277,
  //     displayId: "user127",
  //     groupId: 2,
  //   },
  //   {
  //     posX: 1.5006542770381734,
  //     posY: -2.46765540652277,
  //     displayId: "user128",
  //     groupId: 2,
  //   },
  //   {
  //     posX: 1.5006542770381734,
  //     posY: -2.46765540652277,
  //     displayId: "user129",
  //     groupId: 2,
  //   },
  //   {
  //     posX: 1.5006542770381734,
  //     posY: -2.46765540652277,
  //     displayId: "user220",
  //     groupId: 2,
  //   },
  //   {
  //     posX: -0.3144376337636098,
  //     posY: -0.5927477208963536,
  //     displayId: "hiyoko",
  //     groupId: 3,
  //   },
  //   {
  //     posX: -0.3106018065845387,
  //     posY: -0.5700144204244458,
  //     displayId: "hogehoges",
  //     groupId: 3,
  //   },
  //   {
  //     posX: -0.3157373837030093,
  //     posY: -0.6007338718444423,
  //     displayId: "hogehgoerou",
  //     groupId: 3,
  //   },
  //   {
  //     posX: -0.31186997467974403,
  //     posY: -0.5773959278552644,
  //     displayId: "misaki",
  //     groupId: 3,
  //   },
  //   {
  //     posX: -0.31970191433642325,
  //     posY: -0.626037890307775,
  //     displayId: "",
  //     groupId: 3,
  //   },
  // ];

  const params = useParams();
  const [groupID, setGroupID] = useState<number>(1000);
  const [opinions, setOpinions] = useState<Card[]>([]);

  useEffect(() => {
    if (groupID === 1000) {
      setOpinions(hoge?.opinions || []);
      return;
    }
    const opinions = data?.groupOpinions.filter((opinion) => {
      return opinion.groupId === groupID;
    });
    setOpinions(opinions?.[0]?.opinions || []);
  }, [data?.groupOpinions, groupID, hoge?.opinions]);

  // グループ３が一番意見多そうなので、グループ３の意見を取得
  // ついでにインデックス順にする
  const fa = data?.positions
    .filter((opinion) => {
      return (
        opinion.groupId === 3 &&
        (opinion.perimeterIndex || opinion.perimeterIndex === 0)
      );
    })
    .sort((a, b) => (a.perimeterIndex || 0) - (b.perimeterIndex || 0));

  // 拡大する
  const ho = fa?.flatMap((v) => {
    return [Math.floor(v.posX * 500 + 1000), Math.floor(v.posY * 500 + 1000)];
  });

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
      <Graph polygons={ho} />
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
              isOpnionLink={`/${params.id}/opinion/${opinion.opinion.id}`}
            />
          );
        })}
      </div>
    </>
  );
}
