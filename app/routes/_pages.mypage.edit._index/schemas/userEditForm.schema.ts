import * as v from "valibot";

const alphanumericSchema = v.regex(
  /^[a-zA-Z0-9]*$/,
  "半角英数字で入力してください",
);

const genderSchema = v.optional(
  v.union([
    v.literal("男性"),
    v.literal("女性"),
    v.literal("その他"),
    v.literal("---"),
  ]),
);

const occupationSchema = v.optional(
  v.union([
    v.literal("正社員"),
    v.literal("契約社員"),
    v.literal("公務員"),
    v.literal("自営業"),
    v.literal("会社役員"),
    v.literal("パート・アルバイト"),
    v.literal("家事従事者"),
    v.literal("学生"),
    v.literal("無職"),
    v.literal("その他"),
    v.literal("---"),
  ]),
);

export const userEditFormSchema = v.object({
  displayName: v.string("ユーザー名の入力は必須です"),
  municipality: v.optional(v.string()),
  prefectures: v.optional(v.string()),
  icon: v.optional(v.instance(File)),
  gender: v.optional(genderSchema),
  occupation: v.optional(occupationSchema),
  householdSize: v.optional(v.union([v.string(), v.number()])),
  // MEMO: select 要素の defaultValue が "---" で年月日だけ数字なので変換してる。
  yearOfBirth: v.optional(
    v.pipe(
      v.union([v.string(), v.number()]),
      v.transform((i) => {
        return i === "---" ? null : Number(i);
      }),
    ),
  ),
});
