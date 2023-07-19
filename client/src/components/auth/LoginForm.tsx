import React from 'react'
import styles from './Auth.module.scss'
import { Button, Form, Input, notification } from "antd"
import { setCookie } from "nookies"
import { LoginFormDTO } from '../../types/auth'
import * as Api from "../../api"

export const LoginForm: React.FC = ({ }) => {
  const onSubmit = async (values: LoginFormDTO) => {
    try {
      const { token } = await Api.auth.login(values);

      notification.success({
        message: "Success!",
        description: "Dashboard is loading...",
        duration: 2,
      });

      setCookie(null, "_token", token, {
        path: "/",
      });

      location.href = "/";
    } catch (err) {
      console.warn("LoginForm", err);

      notification.error({
        message: "Error!",
        description: "Wrong Email or Password",
        duration: 2,
      });
    }
  };
  return (
    <div className={styles.formBlock}>
      <Form
        name="basic"
      labelCol={{
        span: 8,
      }}
      onFinish={onSubmit}
    >
      <Form.Item
        label="E-Mail"
        name="email"
        rules={[
          {
            required: true,
            message: "Field can not be empty",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Field can not be empty"
          }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  </div >
  )
}