import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { api } from "~/libs/api";
import { notfound } from "~/libs/notfound";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { data } = await api.GET(
    "/talksessions/{talkSessionID}/opinions/{opinionID}/replies",
    {
      params: {
        path: {
          talkSessionID: params.id!,
          opinionID: params.iid!,
        },
      },
    },
  );

  if (!data) {
    return notfound();
  }

  return json({
    ...data,
    opinions: data?.opinions.reverse(),
  });
};
