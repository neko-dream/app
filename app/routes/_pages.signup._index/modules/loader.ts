import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { api } from "~/libs/api";
import { notfound } from "~/libs/notfound";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { data } = await api.GET("/auth/token/info", {
    headers: request.headers,
  });

  if (!data) {
    throw notfound();
  }

  // 認証済みなら /home にリダイレクト
  if (data?.isVerify) {
    throw redirect("/home");
  }

  return { ...data };
};
