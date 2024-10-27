import { useNavigate } from "@remix-run/react";
import { toast } from "react-toastify";
import { useCustomForm } from "~/feature/form/hooks/useCustomForm";
import { signupFormSchema } from "~/feature/user/schemas/form";
import { api } from "~/libs/api";
import { fileCompress } from "~/libs/compressor";

export const useCreateUserForm = () => {
  const navigate = useNavigate();

  return useCustomForm({
    schema: signupFormSchema,
    onSubmit: async ({ value }) => {
      const compressIcon = value.icon && fileCompress(value.icon);

      const { error } = await api.POST("/user", {
        credentials: "include",
        body: {
          ...value,
          icon: (await compressIcon) as unknown as string,
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
