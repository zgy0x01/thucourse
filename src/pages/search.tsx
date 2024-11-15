import { Card, Empty, Input, message } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import CourseList from "@/components/course-list";
import PageHeader from "@/components/page-header";
import Config from "@/config/config";
import { Pagination } from "@/lib/models";
import { useSearchCourse } from "@/services/course";
import { Checkbox } from "antd";

const { Search } = Input;
var only_has = false;

const SearchPage = () => {
  const router = useRouter();
  const { page, size, q } = router.query;
  const show_q = q ? (q as string) : "";

  const pagination: Pagination = {
    page: page ? parseInt(page as string) : 1,
    pageSize: size ? parseInt(size as string) : Config.PAGE_SIZE,
  };
  const inputRef = useRef<any>(null);

  const { courses, loading, mutate } = useSearchCourse(
    q as string,
    pagination,
    only_has ? 1 : 0
  );

  useEffect(() => {
    inputRef.current?.focus({ cursor: "end" });
    if (show_q == "") return;
    mutate();
  }, []);

  const onSearch = (value: string) => {
    if (value.trim() == "") {
      message.info("请输入搜索内容");
      return;
    }
    router.push({ query: { q: value.trim(), onlyhasreview: only_has } });
  };

  const setOnlyHasReviews = (value: boolean) => {
    only_has = value;
  };

  const onPageChange = (page: number, pageSize: number) => {
    router.push({
      query: { q, page, size: pageSize, onlyhasreview: only_has },
    });
  };

  return (
    <>
      <PageHeader title="搜索" onBack={() => history.back()}></PageHeader>
      <Head>
        <title>{"搜索 " + show_q + " - THU选课社区"}</title>
      </Head>
      <Search
        size="large"
        defaultValue={show_q}
        placeholder="搜索课程名/教师姓名"
        onSearch={onSearch}
        ref={inputRef}
        className="search-input"
      />
      <Checkbox
        defaultChecked={false}
        onChange={(e) => setOnlyHasReviews(e.target.checked)}
      >
        仅显示有点评的课程
      </Checkbox>
      <br />
      <br />
      <Card title={`共有${courses ? courses.count : 0}门课`}>
        <CourseList
          loading={loading}
          pagination={pagination}
          count={courses?.count}
          courses={courses?.results}
          onPageChange={onPageChange}
          showEnroll={true}
        />
      </Card>
    </>
  );
};

export default SearchPage;
