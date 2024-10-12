import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
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

  useEffect(() => {
    fetch(new URL("/api/user", API_BASE_URL), {
      method: "GET",
      mode: "cors",
    }).then(console.log);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center ">
      <p className="mt-32 font-bold">ことひろにログインする</p>
      <p className="mt-4">打っていいのは打たれる覚悟のある奴だけだ</p>
      <div className="mt-16 space-y-4">
        <GoogleLoginButton onClick={handleClick} />
        <FacebookLoginButton />
      </div>
    </div>
  );
}
