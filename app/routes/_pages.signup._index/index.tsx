import {
  useForm,
  getFormProps,
  getInputProps,
  getSelectProps,
} from "@conform-to/react";
import { Form, useNavigate } from "@remix-run/react";
import { parseWithValibot } from "conform-to-valibot";
import { useControl } from "node_modules/@conform-to/react/integrations";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import municipality from "~/assets/data/adress/municipality.json";
import prefectures from "~/assets/data/adress/prefectures.json";
import bathday from "~/assets/data/birthday.json";
import gender from "~/assets/data/gender.json";
import houseHoldSize from "~/assets/data/house-hold-size.json";
import occupation from "~/assets/data/occupation.json";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Label from "~/components/Label";
import Select from "~/components/Select";
import { NON_SELECT_VALUE } from "~/components/Select/constants";
import Uploadarea from "~/components/Uploadarea";
import { m } from "~/constants/message";
import { deleteDashValues } from "~/feature/user/libs/delete-dash-value";
import { isFieldsError } from "~/feature/user/libs/is-fields-error";
import { isMunicipality } from "~/feature/user/libs/is-municipality";
import { signupFormSchema } from "~/feature/user/schemas/form";
import { api } from "~/libs/api";

export { ErrorBoundary } from "./modules/ErrorBoundary";
export { loader } from "./modules/loader";

export default function Page() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, fields] = useForm({
    onSubmit: async (e) => {
      e.preventDefault();

      if (loading) return;
      setLoading(true);

      try {
        const { error } = await api.POST("/user", {
          credentials: "include",
          body: deleteDashValues(form.value) as never,
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
      return parseWithValibot(formData, { schema: signupFormSchema });
    },
    shouldValidate: "onInput",
  });

  const [preview, setPreview] = useState<string>();
  const inputFileRef = useRef<HTMLInputElement>(null);
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

  const handleOnChangeInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const [file] = e.target.files;
    setPreview(URL.createObjectURL(file));
  };

  const handleDisabled = (value?: object, errors?: object) => {
    return (
      Object.keys(deleteDashValues(value)).length === 0 ||
      Object.keys(errors || {}).length !== 0
    );
  };
  console.log(form.value);

  return (
    <div className="flex flex-1 flex-col items-center ">
      <p className="mt-8 font-bold">ユーザー登録する</p>
      <p className="mt-3">打っていいのは打たれる覚悟のある奴だけだ</p>
      <Form
        {...getFormProps(form)}
        method="post"
        onSubmit={form.onSubmit}
        className="mt-8 last-child:m-0 space-y-4 w-full px-6"
      >
        <Label title="ユーザー名" required errors={fields.displayName.errors}>
          <Input
            {...getInputProps(fields.displayName, { type: "text" })}
            error={isFieldsError(fields.displayName.errors)}
            className="h-12 w-full px-4"
            placeholder="記入する"
          />
        </Label>

        <Label title="ユーザーID" required errors={fields.displayID.errors}>
          <Input
            {...getInputProps(fields.displayID, { type: "text" })}
            error={isFieldsError(fields.displayID.errors)}
            className="h-12 w-full px-4"
            placeholder="記入する"
          />
        </Label>

        <Label title="性別" optional errors={fields.gender.errors}>
          <Select
            {...getSelectProps(fields.gender)}
            error={isFieldsError(fields.gender.errors)}
            options={gender.map((v) => ({ value: v, title: v }))}
          />
        </Label>

        <Label title="誕生年" optional errors={fields.yearOfBirth.errors}>
          <Select
            {...getSelectProps(fields.yearOfBirth)}
            error={isFieldsError(fields.yearOfBirth.errors)}
            options={bathday.map((v) => ({ value: `${v}`, title: `${v}年` }))}
          />
        </Label>

        <Label title="都道府県" optional errors={fields.prefectures.errors}>
          <Select
            {...getSelectProps(fields.prefectures)}
            onChange={(e) => {
              // 同じ都道府県が選択されたら何もしない
              if (prefecturesControl.value === e.currentTarget.value) {
                return;
              }
              form.update({
                name: fields.city.name,
                value: NON_SELECT_VALUE,
              });
              prefecturesControl.change(e.currentTarget.value);
            }}
            error={isFieldsError(fields.prefectures.errors)}
            options={prefectures.map((v) => ({ value: v, title: v }))}
          />
        </Label>

        <Label title="市町村" optional errors={fields.city.errors}>
          <Select
            {...getSelectProps(fields.city)}
            disabled={fields.prefectures.value === NON_SELECT_VALUE}
            error={isFieldsError(fields.city.errors)}
            placeholader={
              !fields.city.value ? "都道府県を選択してください" : "選択する"
            }
            options={municipalityOptions}
          />
        </Label>

        <Label title="職業" optional errors={fields.occupation.errors}>
          <Select
            {...getSelectProps(fields.occupation)}
            error={isFieldsError(fields.occupation.errors)}
            options={occupation.map((v) => ({ value: v, title: v }))}
          />
        </Label>

        <Label title="世帯人数" optional errors={fields.householdSize.errors}>
          <Select
            {...getSelectProps(fields.householdSize)}
            error={isFieldsError(fields.householdSize.errors)}
            options={houseHoldSize.map((v) => {
              return {
                value: `${v}`,
                title: v === 5 ? `${v}人以上` : `${v}人`,
              };
            })}
          />
        </Label>

        <Label title="プロフィール画像" optional className="mb-8">
          <Uploadarea
            onClick={() => {
              inputFileRef.current?.click();
            }}
            preview={preview}
          />
        </Label>

        {/* UIには表示しない */}
        <input
          {...getInputProps(fields.icon, { type: "file" })}
          ref={inputFileRef}
          accept="image/png, image/jpeg"
          hidden
          onChange={handleOnChangeInputFile}
        />

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
