import { json, LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { api } from "~/libs/api";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { data } = await api.GET("/auth/token/info", {
    headers: request.headers,
  });

  if (data) {
    throw redirect("/home");
  }

  return json({});
};
