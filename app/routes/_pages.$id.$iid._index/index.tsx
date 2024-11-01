import { getFormProps, getInputProps } from "@conform-to/react";
import {
  Form,
  useLoaderData,
  useOutletContext,
  useRevalidator,
} from "@remix-run/react";
import { toast } from "react-toastify";
import Button from "~/components/Button";
import Card from "~/components/Card";
import Input from "~/components/Input";
import Label from "~/components/Label";
import Textarea from "~/components/Textarea";
import { loader } from "./modules/loader";
import { useCreateOpinionsForm } from "~/feature/opinion/hooks/useCreateOpinionForm";
import { SessionRouteContext } from "../_pages.$id/types";
import { postVote } from "~/feature/opinion/libs/postVote";

export { ErrorBoundary } from "./modules/ErrorBoundary";
export { loader };

export default function Page() {
  const { rootOpinion, opinions, parentOpinion, user } =
    useLoaderData<typeof loader>();
  const { session } = useOutletContext<SessionRouteContext>();

  const { revalidate } = useRevalidator();

  const { form, fields, isDisabled } = useCreateOpinionsForm({
    talkSessionID: session.id!,
    parentOpinionID: rootOpinion.opinion.id,
    onFinishedProcess: () => {
      revalidate();
    },
  });

  const handleSubmitVote = async (opinionID: string, voteStatus: string) => {
    const { data, error } = await postVote({
      talkSessionID: session.id,
      opinionID,
      voteStatus: voteStatus as never,
    });

    if (data) {
      toast.success("意思表明を行いました");
      revalidate();
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
          iconURL: rootOpinion.user.iconURL || "",
        }}
        myVoteType={rootOpinion.myVoteType}
        className="w-full bg-white"
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
              iconURL: parentOpinion.rootOpinion.user.iconURL,
            }}
            opinionStatus={parentOpinion.rootOpinion.opinion.voteType}
            className="w-full bg-white"
            isOpnionLink={`/${session.id}/${parentOpinion.rootOpinion.opinion.id}`}
          />
        )}
      </Card>

      <Form
        {...getFormProps(form)}
        method="post"
        onSubmit={form.onSubmit}
        className="z-10 mb-12 mt-4 flex h-full w-full max-w-[375px] flex-col space-y-4 px-4"
      >
        <Label title="意見" optional>
          <Textarea
            {...getInputProps(fields.opinionContent, {
              type: "text",
            })}
          />
        </Label>
        <Label title="参考文献" optional>
          <Input
            className="h-12 w-full px-4"
            {...getInputProps(fields.referenceURL, {
              type: "text",
            })}
          />
        </Label>
        <Button
          type="submit"
          variation="primary"
          className="mx-auto my-4"
          disabled={isDisabled}
        >
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
              iconURL: opinionUser.iconURL,
            }}
            opinionStatus={opinion.voteType!}
            className="mt-2 h-full w-full select-none bg-white"
            isOpnionLink={`/${session.id}/${opinion.id}`}
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
