import type { Meta, StoryObj } from "@storybook/react";
import Heading from ".";

const meta: Meta<typeof Heading> = {
  title: "components/Heading",
  component: Heading,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "あなたはどう思う？",
  },
};
