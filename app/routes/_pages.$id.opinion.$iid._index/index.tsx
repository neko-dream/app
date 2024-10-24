import { getFormProps, getInputProps } from "@conform-to/react";
import { Form, Link, useLoaderData, useParams } from "@remix-run/react";
import { toast } from "react-toastify";
import Button from "~/components/Button";
import Card from "~/components/Card";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import Label from "~/components/Label";
import Textarea from "~/components/Textarea";
import { useCustomForm } from "~/feature/form/hooks/useCustomForm";
import { api } from "~/libs/api";
import { opinionFormSchema } from "../_pages.$id.swipe/schemas/opinionForm.schema";
import { loader } from "./modules/loader";

export { loader };

export default function Page() {
  const { data } = useLoaderData<typeof loader>();
  const params = useParams();

  const { form, fields } = useCustomForm({
    schema: opinionFormSchema,
    onSubmit: async ({ value }) => {
      const { data, error } = await api.POST(
        "/talksessions/{talkSessionID}/opinions",
        {
          params: {
            path: {
              talkSessionID: params.id as never,
            },
          },
          credentials: "include",
          body: {
            parentOpinionID: params.iid,
            ...value,
          } as never,
        },
      );

      if (data) {
        toast.success("意見を送信しました");
      }
      if (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <Heading className="mt-6">みんなの意見、どう思う？</Heading>

      <div className="mx-4 mt-4">
        <Card
          title={data?.rootOpinion.opinion.title || ""}
          description={data?.rootOpinion.opinion.content || ""}
          user={{
            displayID: "",
            displayName: data?.rootOpinion.user.displayName || "",
            photoURL: data?.rootOpinion.user.iconURL || "",
          }}
          opinionStatus={data?.rootOpinion.opinion.voteType as never}
          className="bg-white pointer-events-none w-full"
        />

        <Form
          {...getFormProps(form)}
          method="post"
          onSubmit={form.onSubmit}
          className="flex flex-col space-y-4 mt-4 w-full h-full max-w-[375px] z-10 px-4"
        >
          <Label title="タイトル" optional>
            <Input
              {...getInputProps(fields.title, { type: "text" })}
              className="h-12 w-full px-4"
            />
          </Label>
          <Label title="意見" optional>
            <Textarea
              {...getInputProps(fields.opinionContent, { type: "text" })}
            />
          </Label>
          <Label title="参考文献" optional>
            <Input
              className="h-12 w-full px-4"
              {...getInputProps(fields.referenceURL, { type: "text" })}
            />
          </Label>
          <Button type="submit" variation="primary" className="mx-auto my-4">
            送信する
          </Button>
        </Form>

        {data?.opinions.map(({ opinion, user }, i) => {
          return (
            <div key={i}>
              <Card
                title={opinion.title || ""}
                description={opinion.content || ""}
                user={{
                  displayID: "",
                  displayName: user.displayName,
                  photoURL: user.iconURL || "",
                }}
                opinionStatus={opinion.voteType!}
                className="bg-white pointer-events-none select-none h-full w-full mt-2"
              />

              <Link to={`/${params.id}/opinion/${opinion.id}`}>
                返信画面にいく
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
