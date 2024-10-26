import { defer, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { api } from "~/libs/api";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const $user = api
    .GET("/auth/token/info", {
      headers: request.headers,
    })

  return defer({ $user });
};
