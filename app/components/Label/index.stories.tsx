import type { Meta, StoryObj } from "@storybook/react";
import Label from ".";

const meta: Meta<typeof Label> = {
  title: "components/Label",
  component: Label,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Required: Story = {
  args: {
    tip: "required",
    label: "あなたの立場",
  },
};

export const Optional: Story = {
  args: {
    tip: "optional",
    label: "あなたの立場",
  },
};
