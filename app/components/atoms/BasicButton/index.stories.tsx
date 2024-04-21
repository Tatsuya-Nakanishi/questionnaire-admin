// /app/components/atoms/BasicButton/index.stories.tsx
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import BasicButton from "./index";

export default {
  title: "Components/Atoms/BasicButton",
  component: BasicButton,
  argTypes: {
    onClick: { action: "clicked" },
  },
} as Meta<typeof BasicButton>;

// テンプレートオブジェクトの利用
export const Default: StoryObj<typeof BasicButton> = {
  args: {
    children: "Click Me",
  },
};

export const Large: StoryObj<typeof BasicButton> = {
  args: {
    children: "Large Button",
  },
};

export const Small: StoryObj<typeof BasicButton> = {
  args: {
    children: "Small Button",
  },
};
