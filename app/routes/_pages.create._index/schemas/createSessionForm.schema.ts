import * as v from "valibot";

export const createSessionFormSchema = v.object({
  theme: v.pipe(
    v.string("テーマの入力は必須です"),
    v.minLength(5, "テーマは5文字以上で入力してください"),
  ),
  scheduledEndTime: v.string("終了日時の入力は必須です"),
  description: v.optional(v.string()),
  municipality: v.optional(v.string()),
  prefectures: v.optional(v.string()),
  latitude: v.optional(v.number()),
  longitude: v.optional(v.number())
});
