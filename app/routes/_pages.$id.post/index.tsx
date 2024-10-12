import Badge from "~/components/Badge";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import Label from "~/components/Label";
import Textarea from "~/components/Textarea";
import UploadArea from "~/components/Uploadarea";

export default function Page() {
  return (
    <>
      <Heading>あなたはどう思う？</Heading>

      <div className="mx-4">
        <Label label="あなたの立場" required className="mt-6" />
        <div className="mt-2 flex space-x-2">
          <Badge status="agree" isSelectStyle />
          <Badge status="pass" isSelectStyle />
          <Badge status="disagree" isSelectStyle />
        </div>

        <Label label="タイトル" optional className="mt-4" />
        <Input placeholder="意見を一言で（タイトル）" className="mt-2" />

        <Label label="意見" required className="mt-4" />
        <Textarea placeholder="あなたの意見を書こう！" className="mt-2" />

        <Label label="参考画像" optional className="mt-4" />
        <UploadArea onUpload={console.log} className="mt-2" />

        <Label label="参考文献" optional className="mt-4" />
        <Input placeholder="リンクなど" className="mt-2" />
      </div>

      <div className="mt-8 flex justify-center space-x-8">
        <Button className="w-24 whitespace-normal">保存する</Button>
        <Button variation="primary" className="w-24 whitespace-normal">
          投稿する
        </Button>
      </div>
    </>
  );
}
