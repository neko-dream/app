import { useCustomForm } from "~/hooks/useCustomForm";
import { createOpinionFormSchema } from "../schemas/createOpinionFormSchema";
import { api } from "~/libs/api";
import { toast } from "react-toastify";
import { fileCompress } from "~/libs/compressor";

type Props = {
  talkSessionID: string;
  parentOpinionID?: string;
  onFinishedProcess: () => void;
};

export const useCreateOpinionsForm = ({
  talkSessionID,
  parentOpinionID,
  onFinishedProcess,
}: Props) => {
  return useCustomForm({
    schema: createOpinionFormSchema,
    onSubmit: async ({ value }) => {
      const compressedPicture =
        value.picture &&
        value.picture?.size !== 0 &&
        fileCompress(value.picture);

      const { data, error } = await api.POST(
        "/talksessions/{talkSessionID}/opinions",
        {
          params: {
            path: {
              talkSessionID,
            },
          },
          credentials: "include",
          body: {
            ...value,
            parentOpinionID,
            picture: (await compressedPicture) as unknown as string,
          },
        },
      );

      if (data) {
        toast.success("意見を送信しました");
        onFinishedProcess();
      }
      if (error) {
        toast.error(error.message);
      }
    },
  });
};
