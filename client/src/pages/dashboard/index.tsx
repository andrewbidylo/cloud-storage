import { GetServerSidePropsContext, NextPage } from "next"
import { checkAuth } from "../../utils/checkAuth"
import { Header } from "../../components/Header"


const DashboardPage: NextPage = () => {
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }
};

export default DashboardPage;