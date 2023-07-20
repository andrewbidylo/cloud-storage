import { GetServerSidePropsContext, NextPage } from "next";
import { checkAuth } from "../utils/checkAuth";
import React from "react";
import { Layout } from "../layouts/Layout";

import * as Api from "../api";
import { FileItem } from "../types/files";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Files } from "../modules/Files";
import { Dashboard } from "../types/dashboard"

interface Props {
  items: FileItem[];
}

const DashboardTrash: Dashboard<Props> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions withRemove />
    </DashboardLayout>
  );
};

DashboardTrash.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Trash">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll("trash");

    return {
      props: {
        items,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { items: [] },
    };
  }
};

export default DashboardTrash;