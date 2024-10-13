import * as v from "valibot";

export const createSessionFormSchema = v.object({
  theme: v.string("テーマの入力は必須です"),
  scheduledEndTime: v.string("終了日時の入力は必須です"),
  description: v.optional(v.string()),
  municipality: v.optional(v.string()),
  prefectures: v.optional(v.string()),
});
