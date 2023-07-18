import { GetServerSidePropsContext, NextPage } from "next"
import { checkAuth } from "../../utils/checkAuth"
import { Header } from "../../components/Header"
import { Layout } from "../../layouts/Layout"
import React from "react"
import { Dashboard } from "../../types/dashboard"



const DashboardPage: Dashboard<NextPage> = () => {
  return (
    <>
      <main>
        <Header />
        <title>
          Dashboard
        </title>
      </main>
    </>

  );
};


DashboardPage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Home">{page}</Layout>;
};


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }
};

export default DashboardPage;