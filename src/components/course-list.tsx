import { Empty, List } from "antd";

import CourseItem from "@/components/course-item";
import { CourseListItem, Pagination } from "@/lib/models";
import { ListLocale } from "antd/es/list";
import locale from "antd/es/date-picker/locale/en_US";
import { Typography } from "antd";

import ContactEmail from "@/components/contact-email";

import Link from "next/link";

const { Paragraph, Title } = Typography;

const listLocale = {
  emptyText: (
    <Empty
      description={
        <Paragraph>
          没有结果？你可以去
          <Link href={"https://yourschool.cc"}>你校社区</Link>
          求助交流
        </Paragraph>
      }
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  ),
};

const CourseList = ({
  loading,
  count,
  courses,
  onPageChange,
  pagination,
  showEnroll,
}: {
  loading: boolean;
  count: number | undefined;
  courses: CourseListItem[] | undefined;
  onPageChange?: Function;
  pagination?: Pagination;
  showEnroll?: boolean;
  locale?: ListLocale;
}) => {
  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      pagination={
        pagination
          ? {
              hideOnSinglePage: true,
              onChange: (page, pageSize) => {
                onPageChange && onPageChange(page, pageSize);
              },
              total: count,
              current: pagination.page,
              defaultCurrent: pagination.page,
              pageSize: pagination.pageSize,
            }
          : false
      }
      dataSource={courses}
      renderItem={(course) => (
        <CourseItem course={course} showEnroll={showEnroll}></CourseItem>
      )}
      locale={listLocale}
    />
  );
};
export default CourseList;
