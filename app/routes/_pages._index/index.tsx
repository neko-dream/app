import { useNavigate } from "@remix-run/react";
import EefaultIcon from "~/assets/default/avator-1.png";
import FacebookLoginButton from "~/components/Button/template/FacebookLoginButton";
import GoogleLoginButton from "~/components/Button/template/GoogleLoginButton";
import { generateMetaTag } from "~/modules/generateMetaTag";

export const meta = generateMetaTag({
  title: "トップページ",
});

export default function Index() {
  const navigate = useNavigate();

  const handleClick = () => {
    const result = window.confirm("Googleの認証ページに飛びます。");
    if (result) {
      navigate("/api/redirecter/signup");
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center ">
      <img src={EefaultIcon} alt="" className="w-32 h-32 mt-16" />
      <p className="mt-3 px-4 ">多種多様な意見や言葉を重ねてよりよい</p>
      <p>意思決定を目指すサービス</p>
      <div className="mt-8 space-y-4">
        <GoogleLoginButton onClick={handleClick} />
        <FacebookLoginButton />
      </div>
    </div>
  );
}
