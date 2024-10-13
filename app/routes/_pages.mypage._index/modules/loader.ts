import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { api } from "~/libs/api";
import { boundary } from "~/modules/boundary";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { data: user } = await api.GET("/auth/token/info", {
    headers: request.headers,
  });

  if (!user) {
    throw boundary();
  }

  return json({ user });
};
