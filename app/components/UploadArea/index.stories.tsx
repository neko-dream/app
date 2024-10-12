import type { Meta, StoryObj } from "@storybook/react";
import Uploadarea from ".";

const meta: Meta<typeof Uploadarea> = {
  title: "components/Uploadarea",
  component: Uploadarea,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onUpload: console.log,
  },
};
