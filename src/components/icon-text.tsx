import { Space } from "antd";
import { FC, createElement } from "react";

export const LeftIconText = ({
  icon,
  text,
}: {
  icon: FC;
  text: string | number;
}) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
);
export const RightIconText = ({
  icon,
  text,
}: {
  icon: FC;
  text: string | number;
}) => (
  <Space>
    {text}
    {createElement(icon)}
  </Space>
);
