import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Form, useNavigate, useOutletContext } from "@remix-run/react";
import { parseWithValibot } from "conform-to-valibot";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import Label from "~/components/Label";
import Textarea from "~/components/Textarea";
import UploadArea from "~/components/Uploadarea";
import { handleDisabled, isFieldsError } from "~/feature/form/libs";
import { createOpinionFormSchema } from "~/feature/opinion/schemas/createOpinionFormSchema";
import { SessionRouteContext } from "~/feature/session/context";
import { api } from "~/libs/api";

export default function Page() {
  const { session } = useOutletContext<SessionRouteContext>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, fields] = useForm({
    onSubmit: async (e) => {
      e.preventDefault();

      if (loading) {
        return;
      }
      setLoading(true);

      try {
        const { data, error } = await api.POST(
          "/talksessions/{talkSessionID}/opinions",
          {
            credentials: "include",
            params: {
              path: {
                talkSessionID: session.id,
              },
            },
            body: form.value as never,
          },
        );

        if (data) {
          toast("投稿しました");
          navigate("../opinion");
        } else {
          toast.error(error.message);
        }
      } catch {
        toast.error("エラーが発生しました");
      } finally {
        setLoading(false);
      }
    },
    onValidate: ({ formData }) => {
      return parseWithValibot(formData, { schema: createOpinionFormSchema });
    },
    shouldValidate: "onInput",
  });

  const [preview, setPreview] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChangeInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const [file] = e.target.files;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <Heading>あなたはどう思う？</Heading>

      <Form {...getFormProps(form)} method="post" className="mx-4">
        <Label
          title="意見"
          className="mt-4"
          required
          errors={fields.opinionContent.errors}
        >
          <Textarea
            {...getInputProps(fields.opinionContent, { type: "text" })}
            error={isFieldsError(fields.opinionContent.errors)}
            className="p-[14px]"
            placeholder="記入する"
          />
        </Label>

        <Label title="参考画像" optional className="mt-4">
          <UploadArea
            className="mt-2"
            onClick={() => {
              inputRef.current?.click();
            }}
            preview={preview}
          />
        </Label>

        <Label
          title="参考文献"
          optional
          className="mt-4"
          errors={fields.referenceURL.errors}
        >
          <Input
            {...getInputProps(fields.referenceURL, { type: "text" })}
            error={isFieldsError(fields.referenceURL.errors)}
            placeholder="リンクなど"
            className="h-12 px-4"
          />
        </Label>

        <input
          {...getInputProps(fields.picture, { type: "text" })}
          type="file"
          hidden
          ref={inputRef}
          onChange={handleOnChangeInputFile}
        />

        <Button
          type="submit"
          variation="primary"
          className="block mt-8 mx-auto whitespace-normal"
          disabled={handleDisabled(form.value, form.allErrors) || loading}
        >
          投稿する
        </Button>
      </Form>
    </>
  );
}
