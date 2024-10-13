import { LoaderFunctionArgs, defer } from "@remix-run/node";
import { m } from "~/constants/message";
import { api } from "~/libs/api";
import { components } from "~/libs/api/openapi";

type User = components["schemas"]["user"] &
  components["schemas"]["userDemographics"];

/**
 * ログインが必須のページのローダー関数を生成する関数
 */
export const requireLoginLoader = <T extends Record<string, unknown>>(
  callback: (args: LoaderFunctionArgs, user: User) => Promise<T>,
) => {
  return async (args: LoaderFunctionArgs) => {
    const { data } = await api.GET("/user", {
      headers: args.request.headers,
    });
    if (!data) {
      throw new Response(null, {
        status: 401,
        statusText: m.ログイン後閲覧可能です,
      });
    }

    const result = await callback(args, {
      ...data.user,
      ...data.demographics,
    });

    return defer(result);
  };
};
