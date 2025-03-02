import { useMutation } from "@tanstack/react-query";
import { Button, Col, Form, Input, message, Row } from "antd";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const nav = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      await axios.post(`http://localhost:3000/signup`, formData);
    },
    onSuccess: () => {
      messageApi.success("Tạo tài khoản thành công");
      setTimeout(() => {
        nav("/signin");
      }, 1000);
    },
  });
  return (
    <div className="container mt-5 mb-5">
      {contextHolder}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Tạo tài khoản</h1>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            style={{ maxWidth: 900, margin: "100px  auto" }}
            onFinish={(formData) => {
              const { password2, ...rest } = formData;
              mutate(rest);
            }}
          >
            <Form.Item
              label="Username"
              name="name"
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Không được để trống" },
                { type: "email", message: "Email không đúng định dạng" },
              ]}
            >
              <Input />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Không được để trống" },
                    { min: 6, message: "Password tối thiểu 6 ký tự" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Xác nhận"
                  name="password2"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Không được để trống" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Mật khẩu không khớp");
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: "Không được để trống" },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[{ required: true, message: "Không được để trống" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              wrapperCol={{
                span: 24,
                style: { textAlign: "center", marginTop: 20 },
              }}
            >
              <button
                type="submit"
                className="signup-button"
                style={{
                  width: "40%",
                  height: "50px",
                  fontSize: "16px",
                  backgroundColor: "#d9d9d9",
                  border: "1px solid #d9d9d9",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
              >
                Tạo tài khoản
              </button>
            </Form.Item>
            <hr style={{ borderTop: "2px dashed #444", marginTop: "20px" }} />

            <Form.Item
              wrapperCol={{
                span: 24,
                style: { textAlign: "center", marginTop: 10 },
              }}
            >
              <Link to="/signin">
                <Button
                  type="primary"
                  style={{
                    width: "20%",
                    height: "50px",
                    fontSize: "16px",
                  }}
                >
                  Đăng nhập
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
