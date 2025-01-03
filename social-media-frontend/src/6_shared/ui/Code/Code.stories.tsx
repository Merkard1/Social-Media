import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Code } from "./Code";

export default {
  title: "6_shared/Code",
  component: Code,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Dafault = Template.bind({});
Dafault.args = {
  text:
        "export default {\n"
        + "    title: 'shared/Code',\n"
        + "    component: Code,\n"
        + "    argTypes: {\n"
        + "        backgroundColor: { control: 'color' },\n"
        + "    },\n"
        + "} as ComponentMeta<typeof Code>;\n"
        + "\n"
        + "const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n"
        + "\n"
        + "export const Normal = Template.bind({});",
};
