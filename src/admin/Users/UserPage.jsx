import { PlusCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Input,
  message,
  Popconfirm,
  Select,
  Skeleton,
  Space,
  Table,
  Tag,
} from "antd";
import React, { useState } from "react";
import { Drawer } from "antd";
import axios from "axios";
import UserEditPage from "./UserEditPage";
import UserAddPage from "./UserAddPage";

const UserPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [userFilter, setUserFilter] = useState();

  const { data, isLoading } = useQuery({
    queryKey: ["USERS_KEY"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/users");
      return data.map((item, index) => ({
        ...item,
        key: item.id,
        stt: index + 1,
      }));
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:3000/users/${id}`);
    },
    onSuccess: () => {
      messageApi.success("Xóa người dùng thành công");
      queryClient.invalidateQueries({ queryKey: ["USERS_KEY"] });
    },
  });

  const columns = [
    { title: "#", dataIndex: "stt", key: "stt" },
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status?.trim() === "Active" ? "green" : "red"}>
          {status || "-"}
        </Tag>
      ),
    },
    {
      key: "action",
      width: 200,
      render: (_, item) => (
        <Space>
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn có chắc chắn muốn xóa không?"
            onConfirm={() => mutate(item.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
          <Button
            type="primary"
            onClick={() => {
              setCurrentUser(item);
              setIsDrawerVisible(true);
            }}
          >
            Cập nhật
          </Button>
        </Space>
      ),
    },
  ];

  const filteredData = data?.filter((user) => {
    const matchesName = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = userFilter ? user.status === userFilter : true;
    return matchesName && matchesStatus;
  });

  const showDrawer = () => setIsDrawerVisible(true);
  const onClose = () => {
    setCurrentUser(null);
    setIsDrawerVisible(false);
  };

  return (
    <div>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-semibold">Quản lý người dùng</h1>
        <Button type="default" onClick={showDrawer}>
          <PlusCircleOutlined /> Thêm người dùng
        </Button>
      </div>
      <Space style={{ marginBottom: 20 }}>
        <Input
          placeholder="Tìm kiếm người dùng theo tên"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 300 }}
        />
        <Select
          placeholder="Chọn tình trạng"
          style={{ width: 200 }}
          value={userFilter}
          onChange={setUserFilter}
        >
          <Select.Option value={null}>Tất cả</Select.Option>
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Deactve">Deactive</Select.Option>
        </Select>
      </Space>
      <Skeleton loading={isLoading} active>
        <Table dataSource={filteredData} columns={columns} rowKey="id" />
      </Skeleton>
      <Drawer
        title={currentUser ? "Cập nhật người dùng" : "Thêm người dùng"}
        width={500}
        placement="right"
        onClose={onClose}
        open={isDrawerVisible}
        style={{ padding: 0, height: "100%" }}
        styles={{ body: { padding: 20, height: "100%" } }}
      >
        <div style={{ height: "100%", overflowY: "auto", padding: "20px" }}>
          {currentUser ? <UserEditPage user={currentUser} /> : <UserAddPage />}
        </div>
      </Drawer>
    </div>
  );
};

export default UserPage;
