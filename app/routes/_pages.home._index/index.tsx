import Card from "~/components/Card";

export default function Page() {
  return (
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
  );
}
