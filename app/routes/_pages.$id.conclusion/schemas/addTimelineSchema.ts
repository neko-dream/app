import * as v from "valibot";

export const addTimelineSchema = v.object({
  content: v.string(),
  status: v.string(),
  parentActionItemID: v.optional(v.string()),
});
