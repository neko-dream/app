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
    <div className="border-b border-gray-400 bg-white p-4">
      <p className="text-xs text-gray-500">テーマ</p>
      <p className="mt-1 line-clamp-1 text-[14px]">{talkSession.theme}</p>
      <div className="mt-1 flex items-center space-x-2">
        <Avator
          src={talkSession.owner.iconURL || undefined}
          className="block h-5 w-5 shrink-0"
        />
        <p className="text-xs text-gray-500">{talkSession.owner.displayName}</p>
      </div>

      <p className="mt-2 line-clamp-3">{talkSession.description}</p>

      {isFinished ? (
        <p className="mt-2 inline-block whitespace-nowrap rounded-full bg-gray-500 px-2 py-1 text-xs text-white">
          終了
        </p>
      ) : (
        <p className="mt-2 inline-block whitespace-nowrap rounded-full bg-blue-500 px-2 py-1 text-xs text-white">
          {JST(talkSession.scheduledEndTime).format("MM/DD(ddd)まで")}
        </p>
      )}
      <div className="mt-2 flex justify-between">
        <div className="flex items-center space-x-1">
          <RiMapPinLine className="text-gray-500" />
          <p className="text-xs text-gray-500">{talkSession.city}</p>
        </div>
        <OpinionLink count={opinionCount} />
      </div>
    </div>
  );
}
