import { getFormProps, getInputProps } from "@conform-to/react";
import { animated } from "@react-spring/web";
import { Form, useParams } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Label from "~/components/Label";
import Textarea from "~/components/Textarea";
import { useCustomForm } from "~/feature/form/hooks/useCustomForm";
import { api as apiClient } from "~/libs/api";
import { useOpinonModal } from "../../hooks/useOpinionModal";
import { opinionFormSchema } from "../../schemas/opinionForm.schema";

type Props = {
  open: boolean;
  onOpenChange: () => void;
};

export const OpinionModal = ({ open, onOpenChange, ...props }: Props) => {
  const { item, api, bind } = useOpinonModal({
    onCloseModal: () => handleCloseModal(),
  });
  const params = useParams();

  const { form, fields } = useCustomForm({
    schema: opinionFormSchema,
    onSubmit: async ({ value }) => {
      const { data, error } = await apiClient.POST(
        "/talksessions/{talkSessionID}/opinions",
        {
          params: {
            path: {
              talkSessionID: params.id as never,
            },
          },
          credentials: "include",
          body: value as never,
        },
      );

      if (data) {
        toast.success("意見を送信しました");
        onOpenChange();
      }
      if (error) {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    if (open) {
      api.start({ opacity: 1, y: 0 });
    } else {
      api.start({ opacity: 1, y: 800 });
    }
  }, [api, open]);

  const handleCloseModal = () => {
    onOpenChange();
  };

  if (!open) {
    return null;
  }

  return (
    <>
      <animated.div
        style={item}
        className="touch-none absolute will-change-transform bottom-0 h-[80%] w-[375px] bg-white z-30 border-t border-gray-200 rounded-t-xl"
      >
        <Form
          {...props}
          {...getFormProps(form)}
          method="post"
          onSubmit={form.onSubmit}
          className="flex flex-col space-y-4 w-full h-full max-w-[375px] z-10 px-4"
        >
          <animated.div
            {...bind()}
            className="cursor-pointer w-full mx-auto py-2"
          >
            <div className="h-1 w-[50%] bg-slate-400 mx-auto rounded-full" />
            <p className="mt-2 select-none text-center">あなたはどう思う？</p>
          </animated.div>
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
          <Button
            type="submit"
            variation="primary"
            className="mx-auto !mt-auto !mb-8"
          >
            送信する
          </Button>
        </Form>
      </animated.div>

      <animated.div
        style={{ opacity: item.opacity, y: -96 }}
        className="w-[375px] top-0 absolute bg-slate-600/60 h-full z-10"
        onClick={handleCloseModal}
      />
    </>
  );
};
