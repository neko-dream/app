import EefaultIcon from "~/assets/default/avator-1.png";
import SingupButton from "~/feature/auth/components/SingupButton";
import { loader } from "./modules/loader";

export { loader };

export default function Index() {
  return (
    <div className="flex flex-1 flex-col items-center">
      <img src={EefaultIcon} alt="" className="mt-16 h-32 w-32" />
      <p className="mt-3 px-4">多種多様な意見や言葉を重ねてよりよい</p>
      <p>意思決定を目指すサービス</p>
      <div className="mt-8 space-y-4">
        <SingupButton />
      </div>
    </div>
  );
}
