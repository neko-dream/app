import * as v from "valibot";
import { str2num } from "~/schemas/str2num";

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

const baseSchema = v.object({
  displayName: v.string("ユーザー名の入力は必須です"),
  city: v.optional(v.string()),
  prefecture: v.optional(v.string()),
  icon: v.optional(v.instance(File)),
  gender: v.optional(genderSchema),
  occupation: v.optional(occupationSchema),
  householdSize: str2num,
  yearOfBirth: str2num,
});

export const adressFormSchema = v.object({
  city: v.optional(v.string()),
  prefecture: v.optional(v.string()),
});

export const userEditFormSchema = v.object({
  ...baseSchema.entries,
  ...adressFormSchema.entries,
});

export const signupFormSchema = v.object({
  displayID: v.pipe(v.string("ユーザーIDの入力は必須です"), alphanumericSchema),
  ...baseSchema.entries,
  ...adressFormSchema.entries,
});
