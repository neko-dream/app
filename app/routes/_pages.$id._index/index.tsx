import { Link } from "@remix-run/react";
import { button } from "~/components/Button";
import Heading from "~/components/Heading";

export default function Page() {
  return (
    <div>
      <Heading>あなたはどう思う？</Heading>

      <Link
        to={"./post"}
        className={button({
          color: "primary",
          className: "block mx-auto mt-6",
        })}
      >
        意見を投稿する
      </Link>

      <Heading className="mt-6">みんなの意見、どう思う？</Heading>
      <Link
        to={"./opinion"}
        className={button({
          color: "primary",
          className: "block mx-auto mt-6 whitespace-nowrap",
        })}
      >
        みんなの意見を見る
      </Link>
    </div>
  );
}
