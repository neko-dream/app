import { isRouteErrorResponse, Link, useRouteError } from "@remix-run/react";
import { button } from "~/components/Button";
import Error from "~/components/Error";
import SingupButton from "~/feature/auth/components/SingupButton";
import { forbidden } from "~/libs/notfound";

export function ErrorBoundary(): JSX.Element {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    return <Error />;
  }

  if (error.status === forbidden.code) {
    return (
      <Error>
        <p className="text-gray-700">
          このページはログインすることで見れます🙇‍♀️
        </p>
        <div className="mt-4">
          <SingupButton />
        </div>
      </Error>
    );
  }

  return (
    <Error>
      <p className="text-gray-700">正常にデータを取得できませんでした🙇‍♀️</p>
      <Link
        to={"../opinion"}
        className={button({
          color: "primary",
          className: "mx-auto mt-6 block whitespace-nowrap",
        })}
      >
        みんなの意見を見る
      </Link>
    </Error>
  );
}
