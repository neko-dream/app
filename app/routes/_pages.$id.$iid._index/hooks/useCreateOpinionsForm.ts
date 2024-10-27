import { useRevalidator } from "@remix-run/react";
import { toast } from "react-toastify";
import { createOpinionFormSchema } from "~/feature/opinion/schemas/createOpinionFormSchema";
import { useCustomForm } from "~/hooks/useCustomForm";
import { api } from "~/libs/api";
import { fileCompress } from "~/libs/compressor";

type Props = {
  talkSessionID: string;
  parentOpinionID?: string;
};

export const useCreateOpinionsForm = ({
  talkSessionID,
  parentOpinionID,
}: Props) => {
  const { revalidate } = useRevalidator();

  return useCustomForm({
    schema: createOpinionFormSchema,
    onSubmit: async ({ value }) => {
      const compressedPicture = value.picture && fileCompress(value.picture);

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
        revalidate();
      }
      if (error) {
        toast.error(error.message);
      }
    },
  });
};
