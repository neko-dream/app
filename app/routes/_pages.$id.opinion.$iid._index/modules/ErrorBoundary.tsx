import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import Error from "~/components/Error";
import Heading from "~/components/Heading";

export function ErrorBoundary(): JSX.Element {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <Heading>みんなの意見、どう思う？</Heading>

        <Error>
          <p>お探しの意見は</p>
          <p>見つかりませんでした...</p>
          <p className="text-xs mt-2 text-gray-700">
            右上の 🔍 からトークセッションは探せるよ！
          </p>
        </Error>
      </>
    );
  }

  return <Error />;
}
