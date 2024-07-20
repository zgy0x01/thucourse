import { Card, Col, Grid, Row, Statistic } from "antd";
import Head from "next/head";
import {
  Bar,
  BarChart,
  Brush,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import PageHeader from "@/components/page-header";
import { useStatistic } from "@/services/statistic";

const { useBreakpoint } = Grid;

const IntervalAxisTick = ({ x, y, payload }: any) => {
  console.log(x, y, payload);

  return (
    <g transform={`translate(${x + 8},${y})`}>
      <text y={0} dy={12} textAnchor="end" fill="#666">
        {payload.value < 5 ? `[${payload.value}, ${payload.value + 1})` : 5}
      </text>
    </g>
  );
};

const StatisticPage = () => {
  const { indexState, loading } = useStatistic();
  const screens = useBreakpoint();
  const numberColSpan = screens.sm ? 6 : 12;
  const figureColSpan = screens.xs ? 24 : 12;
  return (
    <>
      <Head>
        <title>统计 - THU选课社区</title>
      </Head>
      <PageHeader title="统计" />
      <Card title="全部数据">
        <Row
          className="info-row"
          gutter={16}
          justify="space-between"
          align="middle"
        >
          <Col span={numberColSpan}>
            <Statistic
              title="点评总数"
              loading={loading}
              value={indexState?.review_count}
            />
          </Col>
          <Col span={numberColSpan}>
            <Statistic
              title="课程总数"
              loading={loading}
              value={indexState?.course_count}
            />
          </Col>
          <Col span={numberColSpan}>
            <Statistic
              title="已点评课程数"
              loading={loading}
              value={indexState?.course_with_review_count}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default StatisticPage;
