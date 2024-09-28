import Button from "~/components/Button";
import Card from "~/components/Card";
import Heading from "~/components/Heading";

export default function Page() {
  return (
    <>
      <Heading>みんなの意見、どう思う？</Heading>

      <div className="m-4">
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

      <div className="mt-8 flex justify-around">
        <Button variation="agree" className="w-20">
          賛成
        </Button>
        <Button variation="pass" className="w-20">
          保留
        </Button>
        <Button variation="disagree" className="w-20">
          反対
        </Button>
      </div>
    </>
  );
}
