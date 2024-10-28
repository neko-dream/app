import { getFormProps, getInputProps } from "@conform-to/react";
import { Form, useFetcher } from "@remix-run/react";
import { Suspense, useState, lazy, useCallback, useEffect } from "react";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import Label from "~/components/Label";
import Textarea from "~/components/Textarea";
import { isFieldsError } from "~/libs/form";
import AdressInputs from "~/feature/form/components/AdressInputs";
import { useCreateSessionForm } from "./hooks/useCreateSessionForm";

const Map = lazy(() => import("./components/Map"));

export { action } from "./modules/actions";

/**
 * ====================================
 *
 * FIXME: とりあえず動くように再レンダリング抑制する
 *
 * ====================================
 */
export default function Page() {
  const fetcher = useFetcher();
  const [showLocationFields, setShowLocationFields] = useState(false);

  const { form, fields } = useCreateSessionForm();

  const handlePositionChange = useCallback(
    async (lat: number, lng: number) => {
      form.update({
        name: fields.latitude.name,
        value: lat,
      });
      form.update({
        name: fields.longitude.name,
        value: lng,
      });
      fetcher.submit(
        {
          latitude: String(lat),
          longitude: String(lng),
          type: "reverseGeocoder",
        },
        { method: "post" },
      );
    },
    [fetcher, fields.latitude.name, fields.longitude.name, form],
  );

  useEffect(() => {
    if (
      fetcher.data &&
      typeof fetcher.data === "object" &&
      !("error" in fetcher.data)
    ) {
      const data = fetcher.data as { prefecture: string; city: string };
      form.update({
        name: fields.prefecture.name,
        value: data.prefecture,
      });
      form.update({
        name: fields.city.name,
        value: data.city,
      });
    }
    if (
      fetcher.data &&
      typeof fetcher.data === "object" &&
      !("error" in fetcher.data)
    ) {
      const data = fetcher.data as { lat: number; lng: number };
      form.update({
        name: fields.latitude.name,
        value: data.lat,
      });
      form.update({
        name: fields.longitude.name,
        value: data.lng,
      });
    }
  }, [fetcher.data]);

  function LazyMap() {
    return (
      <Suspense fallback={<div>Loading map...</div>}>
        <Map
          onLatLngChange={handlePositionChange}
          initialPosition={
            fields.latitude.valid && fields.longitude.valid
              ? {
                  lat: Number(fields.latitude.value) || 35.6768927,
                  lng: Number(fields.longitude.value) || 139.752275,
                }
              : undefined
          }
        />
      </Suspense>
    );
  }

  useEffect(() => {
    if (fields.prefecture.value !== "---") {
      fetcher.submit(
        {
          prefecture: fields.prefecture.value || "",
          city: "",
          type: "normalizeGeocoder",
        },
        { method: "post" },
      );
    }
  }, [fields.prefecture.value]);

  useEffect(() => {
    // 都道府県と市区町村が選択されている場合のみ緯度経度を取得
    if (fields.city.value !== "---" && fields.prefecture.value !== "---") {
      fetcher.submit(
        {
          prefecture: fields.prefecture.value || "",
          city: fields.city.value || "",
          type: "normalizeGeocoder",
        },
        { method: "post" },
      );
    }
  }, [fields.city.value, fields.prefecture.value]);

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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showLocationFields}
            onChange={(e) => setShowLocationFields(e.target.checked)}
            className="h-4 w-4"
          />
          <span className="text-sm text-gray-600">
            関連する場所の位置情報を追加する
          </span>
        </div>

        {showLocationFields && (
          <>
            <AdressInputs form={form as never} fields={fields as never} />

            <Label title="位置情報" optional>
              <LazyMap />
            </Label>

            <input
              {...getInputProps(fields.latitude, { type: "number" })}
              hidden
            />
            <input
              {...getInputProps(fields.longitude, { type: "number" })}
              hidden
            />
          </>
        )}

        <Button
          variation="primary"
          type="submit"
          className="mx-auto !mt-12 block"
        >
          登録する
        </Button>
      </Form>
    </div>
  );
}
