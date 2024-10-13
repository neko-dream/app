import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { api } from "~/libs/api";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { data } = await api.GET("/auth/token/info", {
    headers: request.headers,
  });

  // 認証済みなら /home にリダイレクト
  if (data?.isVerify) return redirect("/home");

  return { ...data };
};
