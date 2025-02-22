import React from "react";
import { Table, Tag, Space, Button, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["ORDERS_KEY"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/orders");
      return data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((item, index) => ({ stt: index + 1, key: item.id, ...item }));
    },
  });

  const { data: users } = useQuery({
    queryKey: ["USERS_KEY"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/users");
      return data;
    },
  });

  const { data: payments } = useQuery({
    queryKey: ["PAYMENTS_KEY"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/payments");
      return data;
    },
  });

  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt" },
    { title: "Mã Đơn Hàng", dataIndex: "id", key: "id" },
    {
      title: "Khách Hàng",
      dataIndex: "user_id",
      key: "user_id",
      render: (userId, item) =>
        item.name || users?.find((u) => u.id === userId)?.name || "-",
    },
    {
      title: "Tổng Tiền",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "Trạng Thái Đơn Hàng",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Hoàn thành"
              ? "green"
              : status === "Hủy"
              ? "red"
              : status === "Đã duyệt"
              ? "blue"
              : "volcano"
          }
        >
          {status?.toUpperCase() || "-"}
        </Tag>
      ),
    },
    {
      title: "Trạng Thái Thanh Toán",
      dataIndex: "order_id",
      key: "order_id",
      render: (orderId) => {
        const payment = payments?.find((p) => p.order_id === orderId);
        return (
          <Tag
            color={
              payment?.payment_status === "Đã thanh toán" ? "green" : "volcano"
            }
          >
            {payment?.payment_status?.toUpperCase() || "-"}
          </Tag>
        );
      },
    },
    {
      key: "action",
      width: 200,
      render: (_, item) => (
        <Space>
          <Link to={`/admin/orders/detail/${item.id}`}>
            <Button type="primary">Chi Tiết</Button>
          </Link>
          <Link to={`/admin/orders/edit/${item.id}`}>
            <Button type="primary">Chỉnh sửa</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-semibold">Quản lý đơn hàng</h1>
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={data} columns={columns} rowKey="id" />
      </Skeleton>
    </div>
  );
};

export default OrderPage;
