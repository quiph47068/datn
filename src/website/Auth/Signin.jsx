import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const nav = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post(
        `http://localhost:3000/signin`,
        formData
      );
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      messageApi.success("Đăng nhập thành công");
      setTimeout(() => {
        nav("/");
      }, 1000);
    },
  });
  return (
    <div className="container mt-5 mb-5">
      {contextHolder}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Đăng nhập</h1>
          <Form
            layout="vertical"
            style={{ maxWidth: 500, margin: "100px  auto" }}
            onFinish={(formData) => mutate(formData)}
          >
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
                  height: "40px",
                  fontSize: "16px",
                  backgroundColor: "#d9d9d9",
                  border: "1px solid #d9d9d9",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
              >
                {" "}
                Đăng nhập
              </button>
            </Form.Item>
            <hr style={{ borderTop: "2px dashed #444", marginTop: "20px" }} />

            <Form.Item
              wrapperCol={{
                span: 24,
                style: { textAlign: "center", marginTop: 10 },
              }}
            >
              <Link to="/signup">
                <Button
                  type="primary"
                  style={{
                    width: "30%",
                    height: "40px",
                    fontSize: "16px",
                  }}
                >
                  Tạo tài khoản
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signin;

// <div>
//   {contextHolder}
//   <div className="flex items-center justify-between mb-5">
//     <h1 className="text-3xl font-semibold">Đăng nhập tài khoản</h1>
//     <Form
//       labelCol={{ span: 4 }}
//       wrapperCol={{ span: 14 }}
//       layout="horizontal"
//       style={{ maxWidth: 800 }}
//       onFinish={(formData) => mutate(formData)}
//     >
//       <Form.Item
//         label="Email"
//         name="email"
//         rules={[
//           {
//             required: true,
//             message: "Không được để trống",
//           },
//           {
//             type: "email",
//             message: "Email không đúng định dạng",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         label="Password"
//         name="password"
//         rules={[
//           {
//             required: true,
//             message: "Không được để trống",
//           },
//           {
//             min: 6,
//             message: "Password tối thiểu 6 ký tự",
//           },
//         ]}
//       >
//         <Input.Password />
//       </Form.Item>

//       <Form.Item>
//         <Button htmlType="submit">Đăng nhập</Button>
//       </Form.Item>
//     </Form>
//   </div>
// </div>
