import * as v from "valibot";

export const editTimelineSchema = v.object({
  content: v.string(),
  status: v.string(),
});
