import * as v from "valibot";

export const opinionFormSchema = v.object({
  parentOpinionID: v.optional(v.string()),
  title: v.optional(v.string()),
  opinionContent: v.optional(v.string()),
  referenceURL: v.optional(v.string()),
  picture: v.optional(v.instance(File)),
});
