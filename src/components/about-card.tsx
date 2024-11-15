import { Typography } from "antd";

import ContactEmail from "@/components/contact-email";

import Link from "next/link";

const { Paragraph, Title } = Typography;

const AboutCard = () => {
  return (
    <Typography>
      <Title level={4} style={{ marginTop: 0 }}>
        简介
      </Title>
      <Paragraph>
        THU选课社区为非官方网站，由清华大学自动化，计算机系同学（毕业生or在校生）开发维护。
        <br />
        选课社区目的在于让同学们了解课程的更多情况，不想也不能代替教务处的课程评教。
      </Paragraph>
      <Title level={4}>机制</Title>
      <Title level={5}>匿名身份</Title>
      <Paragraph>
        选课社区无需登录，不存储任何个人信息，您可以放心的提交测评。
      </Paragraph>
      <Title level={5}>点评管理</Title>
      <Paragraph>
        在符合社区规范的情况下，我们不修改选课社区的点评内容，也不评价内容的真实性。
        如果您上过某一门课程并认为网站上的点评与事实不符，欢迎提交您的意见，
        我们相信全面的信息会给大家最好的答案。
        <br />
        选课社区管理员的责任仅限于维护系统的稳定，删除非课程点评内容和重复发帖，并维护课程和教师信息格式，
        方便进行数据的批量处理。
      </Paragraph>
      <Title level={4}>联系方式</Title>
      <Paragraph>
        您可以通过邮件
        <ContactEmail />
        联系我们。
      </Paragraph>
      <Title level={4}>致谢</Title>
      <Paragraph>
        <Link href={"https://github.com/zgy0x01/thucourse"}>THU选课社区</Link>
        基于
        <Link href={"https://github.com/SJTU-jCourse/jcourse"}>
          SJTU选课社区
        </Link>
        源代码
      </Paragraph>
      <Title level={4}>快捷访问</Title>
      <Paragraph>
        THU选课社区已内置在
        <Link href={"https://yourschool.cc"}>你校app</Link>
        内，可以在app内直接点击图标快捷访问
      </Paragraph>
      <Title level={4}>友情链接</Title>
      <Paragraph>
        <Link href={"https://yourschool.cc/thubook"}>THU手册</Link>
        <br />
        <Link href={"https://feiyue.online/"}>清华大学飞跃手册</Link>
      </Paragraph>
    </Typography>
  );
};

export default AboutCard;
