import type { Meta, StoryObj } from "@storybook/react";
import Error from ".";

const meta: Meta<typeof Error> = {
  title: "components/Error",
  component: Error,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
