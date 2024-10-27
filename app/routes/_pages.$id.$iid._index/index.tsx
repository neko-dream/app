import { getFormProps, getInputProps } from "@conform-to/react";
import {
  Form,
  useLoaderData,
  useParams,
  useRevalidator,
} from "@remix-run/react";
import { toast } from "react-toastify";
import Button from "~/components/Button";
import Card from "~/components/Card";
import Input from "~/components/Input";
import Label from "~/components/Label";
import Textarea from "~/components/Textarea";
import { useCustomForm } from "~/feature/form/hooks/useCustomForm";
import { createOpinionFormSchema } from "~/feature/opinion/schemas/createOpinionFormSchema";
import { api } from "~/libs/api";
import { loader } from "./modules/loader";

export { ErrorBoundary } from "./modules/ErrorBoundary";
export { loader };

export default function Page() {
  const { rootOpinion, opinions, parentOpinion, user } =
    useLoaderData<typeof loader>();

  const params = useParams();
  const { revalidate } = useRevalidator();

  const { form, fields } = useCustomForm({
    schema: createOpinionFormSchema,
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
        revalidate();
      }
      if (error) {
        toast.error(error.message);
      }
    },
  });

  const handleSubmitVote = async (opinionID: string, voteStatus: string) => {
    const { data, error } = await api.POST(
      "/talksessions/{talkSessionID}/opinions/{opinionID}/votes",
      {
        credentials: "include",
        params: {
          path: {
            talkSessionID: params.id!,
            opinionID: opinionID,
          },
        },
        body: {
          voteStatus: voteStatus as never,
        },
      },
    );

    if (data) {
      toast.success("意思表明を行いました");
    }
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="m-4">
      <Card
        title={rootOpinion.opinion.title}
        description={rootOpinion.opinion.content}
        user={{
          displayID: "",
          displayName: rootOpinion.user.displayName,
          photoURL: rootOpinion.user.iconURL,
        }}
        opinionStatus={rootOpinion.opinion.voteType}
        className="bg-white w-full"
        isJegde={rootOpinion.user.displayID !== user?.displayId}
        onClickVoteButton={(voteStatus) => {
          handleSubmitVote(rootOpinion.opinion.id, voteStatus);
        }}
      >
        {parentOpinion && (
          <Card
            title={parentOpinion.rootOpinion.opinion.title}
            description={parentOpinion.rootOpinion.opinion.content}
            user={{
              displayID: "",
              displayName: parentOpinion.rootOpinion.user.displayName,
              photoURL: parentOpinion.rootOpinion.user.iconURL,
            }}
            opinionStatus={parentOpinion.rootOpinion.opinion.voteType}
            className="bg-white w-full"
            isOpnionLink={`/${params.id}/${parentOpinion.rootOpinion.opinion.id}`}
          />
        )}
      </Card>

      <Form
        {...getFormProps(form)}
        method="post"
        onSubmit={form.onSubmit}
        className="flex flex-col space-y-4 mb-12 mt-4 w-full h-full max-w-[375px] z-10 px-4"
      >
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

      {opinions.map(({ opinion, user: opinionUser, myVoteType }, i) => {
        return (
          <Card
            key={i}
            title={opinion.title}
            description={opinion.content}
            user={{
              displayID: "",
              displayName: opinionUser.displayName,
              photoURL: opinionUser.iconURL,
            }}
            opinionStatus={opinion.voteType!}
            className="bg-white select-none h-full w-full mt-2"
            isOpnionLink={`/${params.id}/${opinion.id}`}
            isJegde={opinionUser.displayID !== user?.displayId}
            myVoteType={myVoteType}
            onClickVoteButton={(voteStatus) => {
              handleSubmitVote(opinion.id, voteStatus);
            }}
          />
        );
      })}
    </div>
  );
}
