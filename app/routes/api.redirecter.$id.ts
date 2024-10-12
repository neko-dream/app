import { LoaderFunction, redirect } from "@remix-run/cloudflare";

/**
 * 外部のページにリダイレクトするページ
 *
 * オープンリダイレクト対策: https://www.mbsd.jp/research/20220526/open-redirect/
 * loaderの中でクエリを作成することで外部から操作できないようにしています。
 *
 * @query signup でバックエンドの認証サーバーに飛びます。
 */
export const loader: LoaderFunction = ({ params }) => {
  try {
    switch (params?.id || "") {
      case "signup":
        const signupURL = new URL("auth/google/login", API_BASE_URL);
        signupURL.searchParams.append("redirect_url", BASE_URL);

        return redirect(signupURL.toString());
      default:
        return redirect("/");
    }
  } catch (e) {
    console.log(e);
    return redirect("/");
  }
};
