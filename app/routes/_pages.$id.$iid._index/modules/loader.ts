import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { api } from "~/libs/api";
import { notfound } from "~/libs/notfound";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { data } = await api.GET(
    "/talksessions/{talkSessionID}/opinions/{opinionID}/replies",
    {
      headers: request.headers,
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

  if (data.rootOpinion?.opinion.parentID) {
    const { data: parentOpinion } = await api.GET(
      "/talksessions/{talkSessionID}/opinions/{opinionID}/replies",
      {
        headers: request.headers,
        params: {
          path: {
            talkSessionID: params.id!,
            opinionID: data.rootOpinion.opinion.parentID!,
          },
        },
      },
    );

    return json({
      ...data,
      parentOpinion,
      rootOpinion: data?.rootOpinion,
      opinions: data?.opinions.reverse(),
    });
  }

  return json({
    ...data,
    parentOpinion: undefined,
    rootOpinion: data?.rootOpinion,
    opinions: data?.opinions.reverse(),
  });
};
