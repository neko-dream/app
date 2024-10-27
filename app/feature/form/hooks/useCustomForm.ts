import { useForm } from "@conform-to/react";
import { parseWithValibot } from "conform-to-valibot";
import { useState } from "react";
import { toast } from "react-toastify";
import { ObjectEntries, ObjectSchema } from "valibot";
import { deleteDashValues } from "../libs";
import * as v from "valibot";

/**
 * valibot の共通のスキーマの型
 */
type U = ObjectSchema<ObjectEntries, undefined>;

/**
 * フォーム送信時の引数
 */
type OnSubmitProps<T extends U> = {
  e: React.FormEvent<HTMLFormElement>;
  value: deleteDashValues<v.InferOutput<T>>;
};

type Props<T extends U> = {
  schema: T;
  onSubmit: ({ e, value }: OnSubmitProps<T>) => void;
};

/**
 * なんかいい感じにやってくれるフォームフック
 * @param schema conform のスキーマ
 * @param onSubmit フォームの送信時の処理
 *
 * MEMO: 引数のスキーマで値のチェックを行ったものを onSubmit で返しています。
 * MEMO: "---"の値は送信時に必要がないので削除しています。
 */
export const useCustomForm = <T extends U>({ schema, onSubmit }: Props<T>) => {
  const [loading, setLoading] = useState(false);

  const [form, fields] = useForm({
    onSubmit: async (e) => {
      e.preventDefault();

      if (loading) return;
      setLoading(true);

      const parse = v.safeParse(schema, form.value);

      if (parse.issues) {
        console.error(parse.issues);
        return toast.error("入力内容に誤りがあります");
      }

      try {
        onSubmit({ e, value: deleteDashValues(parse.output) });
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
