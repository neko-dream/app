import {
  getFormProps,
  getInputProps,
  getSelectProps,
  useForm,
} from "@conform-to/react";
import { Form, useNavigate } from "@remix-run/react";
import { parseWithValibot } from "conform-to-valibot";
import dayjs from "dayjs";
import { useControl } from "node_modules/@conform-to/react/integrations";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import municipality from "~/assets/data/adress/municipality.json";
import prefectures from "~/assets/data/adress/prefectures.json";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import Label from "~/components/Label";
import Select from "~/components/Select";
import { NON_SELECT_VALUE } from "~/components/Select/constants";
import Textarea from "~/components/Textarea";
import { m } from "~/constants/message";
import { deleteDashValues } from "~/feature/user/libs/delete-dash-value";
import { isFieldsError } from "~/feature/user/libs/is-fields-error";
import { isMunicipality } from "~/feature/user/libs/is-municipality";
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

  const prefecturesControl = useControl(fields.prefectures);

  // 都道府県が選択されたら市町村の選択肢を変更
  const municipalityOptions = useMemo(() => {
    if (isMunicipality(fields.prefectures.value)) {
      return municipality[fields.prefectures.value].map((v) => ({
        value: v,
        title: v,
      }));
    } else {
      return [];
    }
  }, [fields.prefectures.value]);

  const handleDisabled = (value?: object, errors?: object) => {
    return (
      Object.keys(deleteDashValues(value)).length === 0 ||
      Object.keys(errors || {}).length !== 0
    );
  };

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

        <Label
          title="関係のある都道府県"
          optional
          errors={fields.prefectures.errors}
        >
          <Select
            {...getSelectProps(fields.prefectures)}
            onChange={(e) => {
              // 同じ都道府県が選択されたら何もしない
              if (prefecturesControl.value === e.currentTarget.value) {
                return;
              }
              form.update({
                name: fields.municipality.name,
                value: NON_SELECT_VALUE,
              });
              prefecturesControl.change(e.currentTarget.value);
            }}
            error={isFieldsError(fields.prefectures.errors)}
            options={prefectures.map((v) => ({ value: v, title: v }))}
          />
        </Label>

        <Label title="市町村" optional errors={fields.municipality.errors}>
          <Select
            {...getSelectProps(fields.municipality)}
            disabled={fields.prefectures.value === NON_SELECT_VALUE}
            error={isFieldsError(fields.municipality.errors)}
            placeholader={
              fields.prefectures.value === NON_SELECT_VALUE
                ? "都道府県を選択してください"
                : "選択する"
            }
            options={municipalityOptions}
          />
        </Label>

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
