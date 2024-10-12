import type { Meta, StoryObj } from "@storybook/react";
import adress from "~/assets/data/adress.json";
import birthday from "~/assets/data/birthday.json";
import business from "~/assets/data/business.json";
import gender from "~/assets/data/gender.json";
import Select from ".";

const meta: Meta<typeof Select> = {
  title: "components/Select",
  component: Select,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "normal",
    options: [...Array(30)].map((_, i) => ({
      value: `${i}`,
      title: `${i}個目の北海道!!`,
    })),
  },
};

export const Adress: Story = {
  args: {
    variant: "normal",
    options: adress.map((v) => ({
      value: v,
      title: v,
    })),
  },
};

export const Birthday: Story = {
  args: {
    variant: "normal",
    options: birthday.map((v) => ({
      value: `${v}`,
      title: `${v}`,
    })),
  },
};

export const Gender: Story = {
  args: {
    variant: "normal",
    options: gender.map((v) => ({
      value: `${v}`,
      title: `${v}`,
    })),
  },
};

export const Business: Story = {
  args: {
    variant: "normal",
    options: business.map((v) => ({
      value: `${v}`,
      title: `${v}`,
    })),
  },
};
