import { isRouteErrorResponse, Link, useRouteError } from "@remix-run/react";
import { button } from "~/components/Button";
import Error from "~/components/Error";
import Heading from "~/components/Heading";

export function ErrorBoundary(): JSX.Element {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <Heading>みんなの意見、どう思う？</Heading>

        <Error>
          <p className="text-gray-700">正常にデータを取得できませんでした🙇‍♀️</p>
          <Link
            to={"../opinion"}
            className={button({
              color: "primary",
              className: "block mx-auto mt-6 whitespace-nowrap",
            })}
          >
            みんなの意見を見る
          </Link>
        </Error>
      </>
    );
  }

  return <Error />;
}
