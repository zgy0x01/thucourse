import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Empty,
  Grid,
  Modal,
  Row,
  Space,
  Spin,
} from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import CourseDetailCard from "@/components/course-detail-card";
import PageHeader from "@/components/page-header";
import RelatedCard from "@/components/related-card";
import ReviewFilter from "@/components/review-filter";
import ReviewList from "@/components/review-list";
import ReviewRatingTrend from "@/components/review-rating-trend";
import Config from "@/config/config";
import { Pagination, ReviewFilterValue } from "@/lib/models";
import { useCourseDetail } from "@/services/course";
import { useReviewFilters, useReviewsOfCourse } from "@/services/review";
import { CommonInfoContext } from "@/lib/context";

const { useBreakpoint } = Grid;

type CourseDetailParams = {
  id?: string;
  page?: string;
  size?: string;
  order?: string;
  semester?: string;
  rating?: string;
};

const CoursePage = () => {
  const router = useRouter();
  const params: CourseDetailParams = router.query;
  const { page, size, id, order, semester, rating } = params;

  const pagination: Pagination = {
    page: page ? parseInt(page as string) : 1,
    pageSize: size ? parseInt(size as string) : Config.PAGE_SIZE,
  };

  const filterValue: ReviewFilterValue = {
    order: order ? parseInt(order as string) : 0,
    semester: semester ? parseInt(semester as string) : 0,
    rating: rating ? parseInt(rating as string) : 0,
  };

  const onPageChange = (page: number, pageSize: number) => {
    router.push({ query: { ...params, id, page, size: pageSize } });
  };
  const screens = useBreakpoint();

  const { course, loading: courseLoading } = useCourseDetail(id as string);
  const { reviews, loading: reviewLoading } = useReviewsOfCourse(
    id as string,
    pagination,
    filterValue
  );

  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView();
    }
  }, [reviews]);

  const { filters } = useReviewFilters(id as string);

  const onFilterClick = (value: ReviewFilterValue) => {
    const newParams: CourseDetailParams = {
      id,
      page: (1).toString(),
      size: Config.PAGE_SIZE.toString(),
    };
    if (value.order) newParams.order = value.order.toString();
    if (value.semester) newParams.semester = value.semester.toString();
    if (value.rating) newParams.rating = value.rating.toString();
    router.push({ query: newParams });
  };

  const [modal, contextHolder] = Modal.useModal();

  return (
    <>
      <PageHeader
        title={
          course ? (
            course.name + "（" + course.main_teacher.name + "）"
          ) : (
            <Spin spinning={courseLoading}></Spin>
          )
        }
      />
      <Head>
        <title>
          {course
            ? course.name + "（" + course.main_teacher.name + "） - THU选课社区"
            : "加载中"}
        </title>
      </Head>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <CommonInfoContext.Consumer>
                {(commonInfo) => {
                  const enroll_semester_id =
                    course &&
                    commonInfo?.enrolled_courses.get(course?.id)?.semester_id;
                  const enroll_semester = enroll_semester_id
                    ? commonInfo?.semesterMap.get(enroll_semester_id)
                    : null;
                  return (
                    <CourseDetailCard
                      loading={courseLoading}
                      course={course}
                      enroll_semester={enroll_semester}
                    />
                  );
                }}
              </CommonInfoContext.Consumer>
            </Col>
            {screens.md && (
              <RelatedCard course={course} loading={courseLoading} />
            )}
          </Row>
        </Col>
        <Col xs={24} md={16}>
          <Card
            title={`点评（${reviews ? reviews.count : 0}条）`}
            extra={
              <Space>
                <Button
                  onClick={() => {
                    modal.info({
                      title: course
                        ? course.name +
                          "（" +
                          course.main_teacher.name +
                          "）的点评趋势"
                        : "点评趋势",
                      content: <ReviewRatingTrend data={filters?.semesters} />,
                      icon: null,
                      footer: null,
                      closable: true,
                      width: screens.md ? "60%" : 520,
                    });
                  }}
                >
                  趋势
                </Button>
                <CommonInfoContext.Consumer>
                  {(commonInfo) => {
                    const review_id = course
                      ? commonInfo?.reviewed_courses.get(course.id)?.id
                      : undefined;
                    return (
                      <Link
                        href={
                          review_id
                            ? `/write-review?review_id=${review_id}`
                            : `/write-review?course_id=${id}`
                        }
                      >
                        <Button type="primary" icon={<EditOutlined />}>
                          {review_id ? "修改点评" : "新点评"}
                        </Button>
                      </Link>
                    );
                  }}
                </CommonInfoContext.Consumer>
              </Space>
            }
          >
            <ReviewFilter
              filters={filters}
              defaultValue={filterValue}
              onClick={onFilterClick}
            ></ReviewFilter>
            <Divider></Divider>
            {contextHolder}
            <ConfigProvider
              renderEmpty={() => (
                <Empty
                  description={
                    "暂无点评。如存在新旧课号或任课教师不同的同名课程，您可适当参考相关点评。"
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            >
              <ReviewList
                loading={reviewLoading}
                count={reviews?.count}
                reviews={reviews?.results}
                onPageChange={onPageChange}
                pagination={pagination}
              ></ReviewList>
            </ConfigProvider>
          </Card>
        </Col>
        {!screens.md && <RelatedCard course={course} loading={courseLoading} />}
      </Row>
    </>
  );
};

export default CoursePage;
