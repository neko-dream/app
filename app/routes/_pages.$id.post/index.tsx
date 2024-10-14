import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Form, useOutletContext } from "@remix-run/react";
import { parseWithValibot } from "conform-to-valibot";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import Label from "~/components/Label";
import Textarea from "~/components/Textarea";
import UploadArea from "~/components/Uploadarea";
import { SessionRouteContext } from "~/feature/session/context";
import { isFieldsError } from "~/feature/user/libs/is-fields-error";
import { api } from "~/libs/api";
import { createOpinionFormSchema } from "./schemas/createOpinionForm.schema";

export default function Page() {
  const { session } = useOutletContext<SessionRouteContext>();

  const [form, fields] = useForm({
    onSubmit: async (e) => {
      e.preventDefault();
      console.log(e);

      const { data } = await api.POST(
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

      console.log(data);
    },
    onValidate: ({ formData }) => {
      const p = parseWithValibot(formData, { schema: createOpinionFormSchema });
      console.log(p);

      return p;
    },
  });

  return (
    <>
      <Heading>あなたはどう思う？</Heading>

      <Form {...getFormProps(form)} method="post" className="mx-4">
        <Label
          title="タイトル"
          optional
          className="mt-4"
          errors={fields.title.errors}
        >
          <Input
            {...getInputProps(fields.title, { type: "text" })}
            error={isFieldsError(fields.title.errors)}
            placeholder="意見を一言で（タイトル）"
            className="mt-2"
          />
        </Label>

        <Label
          title="意見"
          required
          className="mt-4"
          errors={fields.opinionContent.errors}
        >
          <Textarea
            {...getInputProps(fields.opinionContent, { type: "text" })}
            error={isFieldsError(fields.opinionContent.errors)}
            placeholder="あなたの意見を書こう！"
            className="mt-2"
          />
        </Label>

        <Label title="参考画像" optional className="mt-4">
          <UploadArea className="mt-2" />
        </Label>

        <Label
          title="参考文献"
          optional
          className="mt-4"
          errors={fields.referenceURL.errors}
        >
          <Input
            {...getInputProps(fields.referenceURL, { type: "text" })}
            placeholder="リンクなど"
            className="mt-2"
          />
        </Label>

        <Button
          type="submit"
          variation="primary"
          className="block mt-8 mx-auto whitespace-normal"
        >
          投稿する
        </Button>
      </Form>
    </>
  );
}
