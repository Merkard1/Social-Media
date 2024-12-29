import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Portal } from "./Portal";

export default {
  title: "6_shared/Portal",
  component: Portal,
  argTypes: {
    element: {
      control: { type: "text" },
      description: "HTML element where the children will be portaled to. Defaults to `document.body`.",
    },
  },
} as ComponentMeta<typeof Portal>;

const Template: ComponentStory<typeof Portal> = (args) => {
  const portalRoot = document.createElement("div");
  portalRoot.style.position = "fixed";
  portalRoot.style.top = "50%";
  portalRoot.style.left = "50%";
  portalRoot.style.transform = "translate(-50%, -50%)";
  portalRoot.style.padding = "20px";
  portalRoot.style.backgroundColor = "white";
  portalRoot.style.border = "1px solid black";
  portalRoot.style.zIndex = "1000";
  document.body.appendChild(portalRoot);

  return <Portal {...args} element={portalRoot} />;
};

export const Default = Template.bind({});
Default.args = {
  children: <div>Portaled Content: This content is rendered in a portal!</div>,
};

export const CustomElement = Template.bind({});
CustomElement.args = {
  children: (
    <div style={{ backgroundColor: "lightblue", padding: "10px" }}>
      Custom Portaled Content
    </div>
  ),
  element: (() => {
    const customDiv = document.createElement("div");
    customDiv.style.position = "fixed";
    customDiv.style.bottom = "20px";
    customDiv.style.right = "20px";
    customDiv.style.padding = "10px";
    customDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    customDiv.style.color = "white";
    customDiv.style.zIndex = "999";
    document.body.appendChild(customDiv);
    return customDiv;
  })(),
};
