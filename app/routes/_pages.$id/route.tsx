import { Outlet } from "@remix-run/react";
import Avator from "~/components/Avator";

export default function Route() {
  return (
    <>
      <div className="flex h-28 flex-col justify-between p-3 pl-4">
        <p className="text-sm text-[#6d6c6a]">テーマ</p>
        <p>オブジェクト指向UIは銀の弾丸か？</p>
        <div className="flex items-center space-x-1">
          <Avator src="" className="h-6 w-6" />
          <p className="text-sm text-[#6d6c6a]">おしゃべりテンボス</p>
        </div>
      </div>

      <Outlet />
    </>
  );
}
