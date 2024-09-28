import type { Meta, StoryObj } from "@storybook/react";
import Button from ".";

const meta: Meta<typeof Button> = {
  title: "components/Button",
  component: Button,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "hello world!!",
  },
};

export const Outline: Story = {
  args: {
    outline: true,
    children: "hello world!!",
  },
};
