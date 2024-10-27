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
import { createOpinionFormSchema } from "~/feature/opinion/schemas/createOpinionFormSchema";
import { api as apiClient } from "~/libs/api";
import { useOpinonModal } from "../../hooks/useOpinionModal";

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
    schema: createOpinionFormSchema,
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
    api.start(() => {
      return {
        opacity: 0,
        y: 500,
      };
    });
    onOpenChange();
  };

  if (!open) {
    return null;
  }

  return (
    <>
      <animated.div
        style={item}
        className="absolute bottom-0 z-30 h-[calc(100vh-112px-40px-32px-16px)] w-[375px] touch-none rounded-t-xl border-t border-gray-200 bg-white will-change-transform"
      >
        <Form
          {...props}
          {...getFormProps(form)}
          method="post"
          onSubmit={form.onSubmit}
          className="z-10 flex h-full w-full max-w-[375px] flex-col space-y-4 px-4"
        >
          <animated.div
            {...bind()}
            className="mx-auto w-full cursor-pointer py-2"
          >
            <div className="mx-auto h-1 w-[50%] rounded-full bg-slate-400" />
            <p className="mt-2 select-none text-center">あなたはどう思う？</p>
          </animated.div>
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
            className="mx-auto !mb-8 !mt-auto"
          >
            送信する
          </Button>
        </Form>
      </animated.div>

      <animated.div
        style={{ opacity: item.opacity }}
        // FIXME: -mt-8 直したい
        className="absolute bottom-0 h-[calc(100vh-112px-40px-32px)] w-[375px] bg-slate-600/60"
        onClick={handleCloseModal}
      />
    </>
  );
};
