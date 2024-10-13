import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import OpinionCount from ".";

const meta: Meta<typeof OpinionCount> = {
  title: "components/OpinionCount",
  component: OpinionCount,
  decorators: [
    (Story) => {
      const Stub = createRemixStub([
        {
          path: "/",
          Component: Story,
        },
      ]);
      return <Stub />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 10,
  },
};

export const Over99: Story = {
  args: {
    count: 100,
  },
};
