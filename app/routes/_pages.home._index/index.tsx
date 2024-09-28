import { Link } from "@remix-run/react";

export default function Page() {
  return (
    <div className="m-4 flex flex-col space-y-8">
      <p>ダッシュボード的な画面</p>
      <p>下記のリンクで各々のページに飛べます</p>
      <Link to="/a" className="underline">
        投票画面
      </Link>
      <Link to="/a/judge" className="underline">
        賛成反対する画面
      </Link>
      <Link to="/a/opinion" className="underline">
        みんなの意見の画面
      </Link>
      <Link to="/a/post" className="underline">
        意見投稿する画面
      </Link>
    </div>
  );
}
