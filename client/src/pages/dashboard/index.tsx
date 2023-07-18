import { GetServerSidePropsContext, NextPage } from "next"
import { checkAuth } from "../../utils/checkAuth"


const DashboardPage: NextPage = () => {
  return (
    <title>
      Dashboard
    </title>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }
};

export default DashboardPage;