import { api } from "~/libs/api";

type Props = {
  talkSessionID: string;
  opinionID: string;
  voteStatus: "agree" | "disagree" | "pass" | null;
};

export const postVote = ({ talkSessionID, opinionID, voteStatus }: Props) => {
  return api.POST("/talksessions/{talkSessionID}/opinions/{opinionID}/votes", {
    credentials: "include",
    params: {
      path: {
        talkSessionID,
        opinionID,
      },
    },
    body: {
      voteStatus,
    },
  });
};
