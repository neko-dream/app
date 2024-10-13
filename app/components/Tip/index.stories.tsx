import type { Meta, StoryObj } from "@storybook/react";
import Tip from ".";

const meta: Meta<typeof Tip> = {
  title: "components/Tip",
  component: Tip,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Optional: Story = {
  args: {
    optional: true,
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};
