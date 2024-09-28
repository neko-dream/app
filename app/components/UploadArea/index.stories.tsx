import type { Meta, StoryObj } from "@storybook/react";
import Textarea from ".";

const meta: Meta<typeof Textarea> = {
  title: "components/Textarea",
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onUpload: console.log
  },
};
