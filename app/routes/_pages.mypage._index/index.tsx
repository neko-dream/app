import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import SettinIcon from "~/assets/setting.svg";
import Avator from "~/components/Avator";
import Card from "~/components/Card";
import Session from "~/components/Session";
import Tabs from "~/components/Tabs";
import { loader } from "./modules/loader";

export { loader };

export default function Page() {
  const { user, opinions, sessions } = useLoaderData<typeof loader>();
  const [params] = useSearchParams();
  const isFavorite = params.get("q") === "favorite";

  return (
    <div className="flex-1 flex flex-col items-center mt-2">
      <Link to={"/mypage/edit"} className="ml-auto mr-2">
        <img src={SettinIcon} alt="" />
      </Link>
      <Avator src={user.iconURL} className="w-16 h-16 mt-2" />
      <p className="text-2xl">{user.displayName}</p>
      <Tabs
        className="w-full mt-4"
        items={[
          { label: "今まで投稿した意見", href: "/mypage" },
          { label: "リアクション済セッション", href: "/mypage?q=favorite" },
        ]}
        active={isFavorite ? "リアクション済セッション" : "今まで投稿した意見"}
      />
      <div className="bg-gray-100 w-full flex-1 p-2 box-border space-y-2">
        {isFavorite &&
          sessions?.map((session, i) => {
            return <Session {...session} key={i} />;
          })}

        {!isFavorite &&
          opinions?.map(({ opinion }, i) => {
            return (
              <Card
                key={i}
                title={opinion.title}
                description={opinion.content}
                user={{
                  displayID: "",
                  displayName: user.displayName,
                  photoURL: user.iconURL,
                }}
                opinionStatus={opinion.voteType!}
                className="bg-white"
              />
            );
          })}
      </div>
    </div>
  );
}
