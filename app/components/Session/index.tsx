import { RiMapPinLine } from "react-icons/ri";
import { paths } from "~/libs/api/openapi";
import { JST } from "~/libs/date";
import Avator from "../Avator";
import OpinionLink from "../OpinionCount";

// FIXME: ジェネリクスを作る
type Props =
  paths["/talksessions"]["get"]["responses"]["200"]["content"]["application/json"]["talkSessions"][number];

export default function Session({ talkSession, opinionCount }: Props) {
  const isFinished = JST(talkSession.scheduledEndTime).isBefore();

  return (
    <div className="h-[156px] p-4 border-b border-gray-400 bg-white">
      <p className="text-xs text-gray-500">テーマ</p>
      <p className="text-[14px] mt-1">{talkSession.theme}</p>
      <div className="flex space-x-2 items-center mt-1">
        <Avator
          src={talkSession.owner.iconURL || undefined}
          className="block shrink-0 h-5 w-5"
        />
        <p className="text-gray-500 text-xs">{talkSession.owner.displayName}</p>
      </div>
      {isFinished ? (
        <p className="text-xs text-white bg-gray-500 rounded-full px-2 py-1 inline-block whitespace-nowrap mt-4">
          終了
        </p>
      ) : (
        <p className="text-xs text-white bg-blue-500 rounded-full px-2 py-1 inline-block whitespace-nowrap mt-4">
          {JST(talkSession.scheduledEndTime).format("MM/DD(ddd)まで")}
        </p>
      )}
      <div className="flex justify-between mt-2">
        <div className="flex items-center space-x-1">
          <RiMapPinLine className="text-gray-500" />
          <p className="text-xs text-gray-500">{talkSession.city}</p>
        </div>
        <OpinionLink count={opinionCount} />
      </div>
    </div>
  );
}
