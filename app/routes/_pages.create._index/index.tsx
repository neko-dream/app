import {
  getFormProps,
  getInputProps,
  getSelectProps,
  useForm,
} from "@conform-to/react";
import { Form, useFetcher, useNavigate } from "@remix-run/react";
import { parseWithValibot } from "conform-to-valibot";
import dayjs from "dayjs";
import { useControl } from "node_modules/@conform-to/react/integrations";
import {
  Suspense,
  useMemo,
  useState,
  lazy,
  useCallback,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import Label from "~/components/Label";
import Textarea from "~/components/Textarea";
import AdressInputs from "~/feature/form/components/AdressInputs";
import { deleteDashValues, isFieldsError } from "~/feature/form/libs";
import { api } from "~/libs/api";
import { createSessionFormSchema } from "./schemas/createSessionForm.schema";
import { ClientOnly } from "remix-utils/client-only";
import { openReverseGeocoder } from "@geolonia/open-reverse-geocoder";
import { normalize } from "@geolonia/normalize-japanese-addresses";
import municipality from "~/assets/data/adress/municipality.json";
import prefecture from "~/assets/data/adress/prefectures.json";

const MapSelector = lazy(() => import("./map"));

// action関数を追加
import { ActionFunction, json } from "@remix-run/node";
import Select from "~/components/Select";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const t = formData.get("type");
  if (t === "reverseGeocoder") {
    const lat = formData.get("latitude");
    const lng = formData.get("longitude");
    try {
      const result = await openReverseGeocoder([Number(lng), Number(lat)]);
      return json({
        prefecture: result.prefecture,
        city: result.city,
      });
    } catch (error) {
      return json({ error: "住所の取得に失敗しました" }, { status: 400 });
    }
  }
  if (t === "normalizeGeocoder") {
    const prefecture = formData.get("prefecture");
    const city = formData.get("city");

    try {
      // 住所を正規化
      const normalized = await normalize(`${prefecture}${city}`);

      if (
        !normalized ||
        !normalized.point ||
        !normalized.point?.lat ||
        !normalized.point?.lng
      ) {
        return json({ error: "住所の正規化に失敗しました" }, { status: 400 });
      }

      return json({
        lat: normalized.point?.lat,
        lng: normalized.point?.lng,
      });
    } catch (error) {
      return json({ error: "処理に失敗しました" }, { status: 500 });
    }
  }
};

// ログイン済みじゃないとここには来れない
export default function Page() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(18);
  const [showLocationFields, setShowLocationFields] = useState(false);

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
          toast.success("登録が完了しました");
          navigate("/home");
        }
      } catch {
        toast.error("エラーが発生しました");
      } finally {
        setLoading(false);
      }
    },
    onValidate: ({ formData }) => {
      return parseWithValibot(formData, {
        schema: createSessionFormSchema,
      });
    },
    shouldValidate: "onInput",
  });

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
        name: fields.municipality.name,
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

  const prefecturesControl = useControl(fields.prefecture);

  // 都道府県が選択されたら市町村の選択肢を変更
  const municipalityOptions = useMemo(() => {
    // if (isMunicipality(fields.prefecture.value)) {
    //   return municipality[fields.prefecture.value].map((v) => ({
    //     value: v,
    //     title: v,
    //   }));
    // } else {
    //   return [];
    // }
  }, [fields.prefecture.value]);

  const handleDisabled = (value?: object, errors?: object) => {
    return (
      Object.keys(deleteDashValues(value)).length === 0 ||
      Object.keys(errors || {}).length !== 0
    );
  };

  function LazyMap() {
    return (
      <Suspense fallback={<div>Loading map...</div>}>
        <MapSelector
          onLatLngChange={handlePositionChange}
          onZoomChange={setZoom}
          zoom={zoom}
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
            <Label
              title="関係のある都道府県"
              optional
              errors={fields.prefecture.errors}
            >
              <Select
                {...getSelectProps(fields.prefecture)}
                onChange={(e) => {
                  // 同じ都道府県が選択されたら何もしない
                  if (prefecturesControl.value === e.currentTarget.value) {
                    return;
                  }
                  form.update({
                    name: fields.municipality.name,
                    value: "---",
                  });
                  prefecturesControl.change(e.currentTarget.value);
                  if (e.currentTarget.value !== "---") {
                    fetcher.submit(
                      {
                        prefecture: e.currentTarget.value,
                        city: "",
                        type: "normalizeGeocoder",
                      },
                      { method: "post" },
                    );
                  }
                }}
                error={isFieldsError(fields.prefecture.errors)}
                options={prefecture.map((v) => ({ value: v, title: v }))}
              />
            </Label>

            <Label title="市町村" optional errors={fields.municipality.errors}>
              <Select
                {...getSelectProps(fields.municipality)}
                disabled={fields.prefecture.value === "---"}
                error={isFieldsError(fields.municipality.errors)}
                placeholader={
                  fields.prefecture.value === "---"
                    ? "都道府県を選択してください"
                    : "選択する"
                }
                options={[]}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  form.update({
                    name: fields.municipality.name,
                    value: value,
                  });

                  // 都道府県と市区町村が選択されている場合のみ緯度経度を取得
                  if (value !== "---" && fields.prefecture.value !== "---") {
                    fetcher.submit(
                      {
                        prefecture: fields.prefecture.value || "",
                        city: value,
                        type: "normalizeGeocoder",
                      },
                      { method: "post" },
                    );
                  }
                }}
              />
            </Label>

            <Label title="位置情報" optional>
              <ClientOnly fallback={<p>Loading...</p>}>
                {() => <LazyMap />}
              </ClientOnly>
              <input
                {...getInputProps(fields.latitude, { type: "number" })}
                hidden
              />
              <input
                {...getInputProps(fields.longitude, { type: "number" })}
                hidden
              />
            </Label>
          </>
        )}

        <Button
          variation="primary"
          type="submit"
          className="mx-auto !mt-12 block"
          disabled={handleDisabled(form.value, form.allErrors) || loading}
        >
          登録する
        </Button>
      </Form>
    </div>
  );
}
