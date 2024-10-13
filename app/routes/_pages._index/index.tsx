import { useNavigate } from "@remix-run/react";
import FacebookLoginButton from "~/components/Button/template/FacebookLoginButton";
import GoogleLoginButton from "~/components/Button/template/GoogleLoginButton";

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
      <p className="mt-8 font-bold">ことひろにログインする</p>
      <p className="mt-3">打っていいのは打たれる覚悟のある奴だけだ</p>
      <div className="mt-8 space-y-4">
        <GoogleLoginButton onClick={handleClick} />
        <FacebookLoginButton />
      </div>
    </div>
  );
}
