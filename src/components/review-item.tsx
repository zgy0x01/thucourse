import { ShareAltOutlined } from "@ant-design/icons";
import { Alert, Button, List, Space, Tooltip, Typography, message } from "antd";
import Link from "next/link";
import { useState } from "react";

import MDPreview from "@/components/md-preview";
import ReviewReactionButton from "@/components/review-reaction-button";
import ReviewRevisionViewModal from "@/components/review-revision-modal";
import { CommonInfoContext } from "@/lib/context";
import { Review } from "@/lib/models";
import { doReviewReaction } from "@/services/review";

const ReviewItem = ({
  review,
}: React.PropsWithChildren<{ review: Review }>) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [revisionModalOpen, setRevisionModalOpen] = useState<boolean>(false);
  const edited = review.modified_at != review.created_at;

  const copyReviewUrlToClipboard = async () => {
    const url = window.location.origin + "/review/" + review.id;
    try {
      await navigator.clipboard.writeText(url);
      messageApi.open({
        type: "success",
        content: "已复制点评链接到剪贴板",
      });
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "复制点评链接失败",
      });
    }
  };
  return (
    <CommonInfoContext.Consumer>
      {(commonInfo) => {
        return (
          <List.Item
            id={`review-${review.id}`}
            key={review.id}
            className={"review-item"}
          >
            {contextHolder}
            {commonInfo?.user.is_staff && revisionModalOpen && (
              <ReviewRevisionViewModal
                review={review}
                open={revisionModalOpen}
                onCancel={() => {
                  setRevisionModalOpen(false);
                }}
              ></ReviewRevisionViewModal>
            )}
            <Space direction="vertical" className="review-body">
              {review.moderator_remark && (
                <Alert
                  message={review.moderator_remark}
                  type="warning"
                  showIcon
                />
              )}
              {review.course && (
                <Space wrap>
                  <Link href={"/course/" + review.course.id}>
                    {review.course.name}（{review.course.teacher}）
                  </Link>
                </Space>
              )}
              <Space wrap>
                <span>
                  <strong>推荐指数：</strong>
                  {review.rating}
                </span>
                {review.semester && (
                  <span>
                    <>
                      <strong>学期：</strong>
                      {typeof review.semester == "string"
                        ? review.semester
                        : review.semester.name}
                    </>
                  </span>
                )}
                {review.score && (
                  <span>
                    <strong>成绩：</strong>
                    {review.score}
                  </span>
                )}
              </Space>
              <MDPreview className="comment" src={review.comment} />
              <Space>
                {edited ? (
                  <Tooltip
                    key="time"
                    title={"首发于" + review.created_at}
                    zIndex={1}
                  >
                    <Typography.Text
                      type="secondary"
                      onClick={() => {
                        if (commonInfo?.user.is_staff) {
                          setRevisionModalOpen(true);
                        }
                      }}
                    >
                      编辑于 {review.modified_at}
                    </Typography.Text>
                  </Tooltip>
                ) : (
                  <Typography.Text type="secondary">
                    #{review.id} · {review.modified_at}
                  </Typography.Text>
                )}
                {(commonInfo?.my_reviews.has(review.id) ||
                  commonInfo?.user.is_staff) && (
                  <Link href={`/write-review?review_id=${review.id}`}>
                    修改点评
                  </Link>
                )}
              </Space>
            </Space>
          </List.Item>
        );
      }}
    </CommonInfoContext.Consumer>
  );
};

export default ReviewItem;
