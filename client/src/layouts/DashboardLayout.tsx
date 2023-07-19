import React from "react";
import styles from "@/styles/Home.module.scss";
import { useRouter } from "next/router";
import { UploadButton } from "../components/UploadButton";
import { Menu } from "antd";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileOutlined,
} from "@ant-design/icons";

export const DashboardLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const selectedMenu = router.pathname;

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <UploadButton />
        <Menu
          className={styles.menu}
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={[
            {
              key: `/`,
              icon: <FileOutlined />,
              label: `Files`,
              onClick: () => router.push("/"),
            },
            {
              key: `/photos`,
              icon: <FileImageOutlined />,
              label: `Photo`,
              onClick: () => router.push("/photos"),
            },
            {
              key: `/trash`,
              icon: <DeleteOutlined />,
              label: `Trash`,
              onClick: () => router.push("/trash"),
            },
          ]}
        />
      </div>

      <div className="container">{children}</div>
    </main>
  );
};