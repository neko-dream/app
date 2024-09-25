import { useNavigate } from "@remix-run/react";
import Button from "~/components/Button";

export default function Index() {
  const navigate = useNavigate();

  const handleClick = () => {
    window.alert("なんかログインダイアログだす");
    navigate("/home");
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4">
      <Button onClick={handleClick} outline>
        Googleログイン
      </Button>
      <Button onClick={handleClick}>Facebookログイン</Button>
    </div>
  );
}
