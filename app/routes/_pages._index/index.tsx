import { useNavigate } from "@remix-run/react";
import FacebookLoginButton from "~/components/Button/template/FacebookLoginButton";
import GoogleLoginButton from "~/components/Button/template/GoogleLoginButton";

export default function Index() {
  const navigate = useNavigate();

  const handleClick = () => {
    window.alert("なんかログインダイアログだす");
    navigate("/home");
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4">
      <GoogleLoginButton onClick={handleClick} />
      <FacebookLoginButton />
    </div>
  );
}
