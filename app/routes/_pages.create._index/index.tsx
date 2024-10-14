import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Form, useNavigate } from "@remix-run/react";
import { parseWithValibot } from "conform-to-valibot";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import Label from "~/components/Label";
import Textarea from "~/components/Textarea";
import { m } from "~/constants/message";
import AdressInputs from "~/feature/form/components/AdressInputs";
import {
  deleteDashValues,
  handleDisabled,
  isFieldsError,
} from "~/feature/form/libs";
import { api } from "~/libs/api";
import { createSessionFormSchema } from "./schemas/createSessionForm.schema";

// ログイン済みじゃないとここには来れない
export default function Page() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, fields] = useForm({
    onSubmit: async (e) => {
      e.preventDefault();

      if (loading) return;
      setLoading(true);

      try {
        console.log(form.value?.scheduledEndTime);

        const { error } = await api.POST("/talksessions", {
          credentials: "include",
          body: deleteDashValues({
            ...form.value,
            scheduledEndTime: dayjs(form.value?.scheduledEndTime).toISOString(),
          }) as never,
        });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success(m.登録が完了しました);
          navigate("/home");
        }
      } catch {
        toast.error(m.エラーが発生しました);
      } finally {
        setLoading(false);
      }
    },
    onValidate: ({ formData }) => {
      return parseWithValibot(formData, { schema: createSessionFormSchema });
    },
    shouldValidate: "onInput",
  });

  return (
    <div className="flex flex-col">
      <Heading className="h-10">投稿されたセッション</Heading>
      <Form
        {...getFormProps(form)}
        onSubmit={form.onSubmit}
        method="post"
        className="m-4 space-y-4"
      >
        <Label title="セッションタイトル" required errors={fields.theme.errors}>
          <Input
            {...getInputProps(fields.theme, { type: "text" })}
            error={isFieldsError(fields.theme.errors)}
            className="h-12 w-full px-4"
            placeholder="記入する"
          />
        </Label>

        <Label title="説明文" optional>
          <Textarea
            {...getInputProps(fields.description, { type: "text" })}
            error={isFieldsError(fields.description.errors)}
            className="h-12 w-full p-[14px]"
            placeholder="記入する"
          />
        </Label>

        <Label title="セッション終了日時" required>
          <Input
            {...getInputProps(fields.scheduledEndTime, { type: "text" })}
            type="date"
            className="h-12 w-full px-4"
            placeholder="記入する"
          />
        </Label>

        <Label title="関係のある場所" optional>
          <Input className="h-12 w-full px-4" placeholder="記入する" />
        </Label>

        {/* FIXME: 型が合わない */}
        <AdressInputs fields={fields} form={form as never} />

        <Button
          variation="primary"
          type="submit"
          className="block !mt-12 mx-auto"
          disabled={handleDisabled(form.value, form.allErrors) || loading}
        >
          登録する
        </Button>
      </Form>
    </div>
  );
}
