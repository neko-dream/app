import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { api } from "~/libs/api";
import { boundary } from "~/modules/boundary";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { data } = await api.GET("/auth/token/info", {
    headers: request.headers,
  });

  // そもそも認証情報がない場合はトップページにリダイレクト
  if (!data) {
    throw boundary();
  }

  // 認証済みなら /home にリダイレクト
  if (data?.isVerify) {
    return redirect("/home");
  }

  return { ...data };
};
