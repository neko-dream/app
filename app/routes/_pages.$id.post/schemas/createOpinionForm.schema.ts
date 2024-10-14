import * as v from "valibot";

export const createOpinionFormSchema = v.object({
  parentOpinionID: v.optional(v.string()),
  title: v.optional(v.string()),
  opinionContent: v.pipe(
    v.string(),
    v.maxLength(140, "140文字以内で入力してください"),
  ),
  referenceURL: v.optional(v.string()),
  picture: v.optional(v.instance(File)),
});
