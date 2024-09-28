import Button from "~/components/Button";
import Heading from "~/components/Heading";

export default function Page() {
  return (
    <div>
      <Heading>あなたはどう思う？</Heading>

      <Button
        variation="primary"
        className="mx-auto mt-6 block"
        isLink={true}
        to={"./post"}
      >
        意見を投稿する
      </Button>

      <Heading className="mt-6">みんなの意見、どう思う？</Heading>

      <Button
        variation="primary"
        className="mx-auto mt-6 block whitespace-nowrap"
        isLink={true}
        to={"./opinion"}
      >
        みんなの意見を見る
      </Button>
    </div>
  );
}
