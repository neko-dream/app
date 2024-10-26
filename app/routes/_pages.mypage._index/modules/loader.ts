import { api } from "~/libs/api";
import { requireLoginLoader } from "~/modules/requireLoginLoader";

export const loader = requireLoginLoader(async ({ request }, user) => {
  const { data: opinions } = await api.GET("/opinions/histories", {
    headers: request.headers,
  });

  const { data: sessions } = await api.GET("/talksessions/histories", {
    headers: request.headers,
  });

  return {
    user,
    opinions: opinions?.opinions,
    sessions: sessions?.talkSessions,
  };
});
