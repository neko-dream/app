import * as v from "valibot";
import { str2num } from "~/schemas/str2num";

export const createSessionFormSchema = v.object({
  theme: v.pipe(
    v.string("テーマの入力は必須です"),
    v.minLength(5, "テーマは5文字以上で入力してください"),
  ),
  scheduledEndTime: v.string("終了日時の入力は必須です"),
  description: v.optional(v.string()),
  city: v.optional(v.string()),
  prefecture: v.optional(v.string()),
  latitude: v.optional(str2num),
  longitude: v.optional(str2num),
});
