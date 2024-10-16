import { Link } from "@remix-run/react";
import { button } from "~/components/Button";
import Card from "~/components/Card";
import Heading from "~/components/Heading";
import { scrolled } from "~/variants/scrolled-component";

export default function Page() {
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
      <div className={scrolled({ class: "m-4 space-y-4" })}>
        <Card
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
        <Card
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
        <Card
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
        <Card
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
      </div>
    </>
  );
}
