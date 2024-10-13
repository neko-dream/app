import { isRouteErrorResponse, Link, useRouteError } from "@remix-run/react";
import Error from "~/components/Error";

export function ErrorBoundary(): JSX.Element {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Error>
        <p>ログイン後使用可能です！</p>
        <Link to={"/"} className="underline mt-2 text-blue-500">
          ログイン画面へ
        </Link>
      </Error>
    );
  }

  return <Error />;
}
