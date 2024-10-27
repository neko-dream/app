import { getFormProps, getInputProps } from "@conform-to/react";
import { Form } from "@remix-run/react";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import Label from "~/components/Label";
import Textarea from "~/components/Textarea";
import AdressInputs from "~/feature/form/components/AdressInputs";
import { useCreateSessionForm } from "./hooks/useCreateSessionForm";
import { isFieldsError } from "~/libs/form";

// ログイン済みじゃないとここには来れない
export default function Page() {
  const { fields, form, isDisabled } = useCreateSessionForm();

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
            {...getInputProps(fields.scheduledEndTime, {
              type: "text",
            })}
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
          className="mx-auto !mt-12 block"
          disabled={isDisabled}
        >
          登録する
        </Button>
      </Form>
    </div>
  );
}
