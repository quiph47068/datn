import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message, Select, Skeleton } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "antd/es/form/Form";

const UserEditPage = ({ user }) => {
  const [form] = useForm();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  if (!user) return <Skeleton active />;

  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      await axios.patch(`http://localhost:3000/users/${user.id}`, formData);
    },
    onSuccess: () => {
      messageApi.success("Cập nhật người dùng thành công");
      queryClient.invalidateQueries({ queryKey: ["USERS_KEY"] });
      form.resetFields();
      navigate("/admin/users");
    },
    onError: (error) => {
      messageApi.error("Cập nhật thất bại: " + error.message);
      console.error("API Error:", error);
    },
  });

  return (
    <div>
      {contextHolder}
      <h1 className="text-3xl font-semibold mb-5">Cập nhật người dùng</h1>
      <Form
        form={form}
        initialValues={{ ...user }}
        name="userEditForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={(formData) => mutate(formData)}
      >
        <Form.Item
          label="Tên người dùng"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên người dùng" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email" }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="Vai trò" name="role">
          <Select>
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Customer">Customer</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Trạng thái" name="status">
          <Select>
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Deactive">Deactive</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserEditPage;
