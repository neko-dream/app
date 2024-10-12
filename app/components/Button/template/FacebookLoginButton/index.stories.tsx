import type { Meta, StoryObj } from "@storybook/react";
import FacebookLoginButton from ".";

const meta: Meta<typeof FacebookLoginButton> = {
  title: "components/Button/FacebookLoginButton",
  component: FacebookLoginButton,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
