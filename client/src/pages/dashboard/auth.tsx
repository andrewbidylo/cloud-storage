import { NextPage } from 'next'
import Head from 'next/head'
import { LoginForm } from '../../components/Auth/LoginForm'
import {Tabs} from 'antd'
import { RegisterForm } from '../../components/Auth/RegisterForm'

const AuthPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          Dashboard / Auth
        </title>
      </Head>
      <main style={{ width: "400px", margin: "50px auto" }}>
      <Tabs
        items={[
          {
            label: "Log in",
            key: "1",
            children: <LoginForm />
          },
          {
            label: "Register",
            key: "2",
            children: <RegisterForm />
          },
        ]} />
      </main>
    </>
  )
}
export default AuthPage;