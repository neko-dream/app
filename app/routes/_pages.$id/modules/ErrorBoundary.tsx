import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import Error from "~/components/Error";

export function ErrorBoundary(): JSX.Element {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Error>
        <p>お探しのトークセッションは </p>
        <p>見つかりませんでした...</p>
        <p className="text-xs mt-2 text-gray-700">右上の 🔍 から探せるよ！</p>
      </Error>
    );
  }

  return <Error />;
}
