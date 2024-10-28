import { useCustomForm } from "~/hooks/useCustomForm";
import { createSessionFormSchema } from "../schemas";
import { api } from "~/libs/api";
import { toast } from "react-toastify";
import { useNavigate } from "@remix-run/react";
import dayjs from "dayjs";

export const useCreateSessionForm = () => {
  const navigate = useNavigate();

  return useCustomForm({
    schema: createSessionFormSchema,
    onSubmit: async ({ value }) => {
      const { error } = await api.POST("/talksessions", {
        credentials: "include",
        body: {
          ...value,
          scheduledEndTime: dayjs(value?.scheduledEndTime).toISOString(),
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("登録が完了しました");
        navigate("/home");
      }
    },
  });
};
