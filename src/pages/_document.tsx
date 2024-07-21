import { Head, Html, Main, NextScript } from "next/document";

import Config from "@/config/config";

export default function Document() {
  return (
    <Html lang="zh_CN">
      <Head>
        <meta
          name="description"
          content="THU选课社区，清华课程点评与经验分享"
        ></meta>
        <meta
          name="keywords"
          content="THU,选课社区,课程点评,清华,清华大学"
        ></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
