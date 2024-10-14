import { useForm } from "@conform-to/react";
import { parseWithValibot } from "conform-to-valibot";
import { useState } from "react";
import { toast } from "react-toastify";
import { ObjectEntries, ObjectSchema } from "valibot";
import { deleteDashValues } from "../libs";

type U = ObjectSchema<ObjectEntries, undefined>;
type OnSubmitProps = {
  e: React.FormEvent<HTMLFormElement>;
  value: object;
};

type Props<T> = {
  schema: T;
  onSubmit: ({ e, value }: OnSubmitProps) => void;
};

export const useCustomForm = <T extends U>({ schema, onSubmit }: Props<T>) => {
  const [loading, setLoading] = useState(false);

  const [form, fields] = useForm({
    onSubmit: async (e) => {
      e.preventDefault();

      if (loading) return;
      setLoading(true);

      try {
        onSubmit({ e, value: deleteDashValues(form.value) });
      } catch {
        toast.error("エラーが発生しました");
      } finally {
        setLoading(false);
      }
    },
    onValidate: ({ formData }) => {
      return parseWithValibot(formData, { schema });
    },
    shouldValidate: "onBlur",
  });

  return { form, fields, loading };
};
