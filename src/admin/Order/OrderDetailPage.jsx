import { useQuery } from "@tanstack/react-query";
import { Form, Input, Select, Table, Image, Skeleton } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderDetailPage = () => {
  const { id } = useParams();

  // Lấy dữ liệu đơn hàng
  const { data: order, isLoading } = useQuery({
    queryKey: ["ORDERS_KEY", id],
    queryFn: async () => {
      if (!id) return null;
      const { data } = await axios.get(`http://localhost:3000/orders/${id}`);
      return data;
    },
  });

  // Lấy danh sách sản phẩm trong đơn hàng
  const { data: orderItems } = useQuery({
    queryKey: ["ORDER_ITEMS", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/order_items?order_id=${id}`
      );
      return data;
    },
  });

  // Lấy thông tin người dùng
  const { data: user } = useQuery({
    queryKey: ["USER_DETAILS", order?.user_id],
    queryFn: async () => {
      if (!order?.user_id) return null;
      const { data } = await axios.get(
        `http://localhost:3000/users/${order.user_id}`
      );
      return data;
    },
    enabled: !!order?.user_id, // Chỉ chạy khi có user_id
  });

  // Lấy trạng thái thanh toán
  const { data: payment } = useQuery({
    queryKey: ["PAYMENT_STATUS", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/payments?order_id=${id}`
      );
      return data.length ? data[0] : null;
    },
  });

  const { data: productVariants } = useQuery({
    queryKey: ["PRODUCT_VARIANTS"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/product_variants`
      );
      return data;
    },
  });

  // Lấy danh sách giá trị variants
  const { data: variantValues } = useQuery({
    queryKey: ["VARIANT_VALUES"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/variant_values`);
      return data;
    },
  });

  // Lấy danh sách ảnh variants
  const { data: variantImages } = useQuery({
    queryKey: ["VARIANT_IMAGES"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/variant_images`);
      return data;
    },
  });

  // Cấu hình các cột cho bảng
  const columns = [
    {
      title: "Ảnh",
      dataIndex: "variant_id",
      key: "image_url",
      render: (variant_id) => {
        const image = variantImages?.find(
          (img) => img.value_id === variant_id
        )?.image_url;
        return image ? <Image width={50} height={50} src={image} /> : "-";
      },
    },
    {
      title: "Sản phẩm",
      dataIndex: "variant_id",
      key: "name",
      render: (variant_id) => {
        const variant = productVariants?.find(
          (v) => v.variant_id === variant_id
        );
        return variant ? variant.name : "-";
      },
    },
    {
      title: "Giá",
      dataIndex: "variant_id",
      key: "price",
      render: (variant_id) => {
        const variantValue = variantValues?.find(
          (v) => v.variant_id === variant_id
        );
        return variantValue
          ? `${variantValue.price.toLocaleString()} VND`
          : "N/A";
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng",
      dataIndex: "variant_id",
      key: "total_price",
      render: (variant_id, record) => {
        const variantValue = variantValues?.find(
          (v) => v.variant_id === variant_id
        );
        const price = variantValue ? variantValue.price : 0;
        return `${(price * record.quantity).toLocaleString()} VND`;
      },
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-5">Chi tiết đơn hàng</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Tên người nhận">
          <Input
            value={user?.name || order?.name || "Chưa cập nhật"}
            readOnly
          />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input
            value={order?.phone_number || user?.phone || "Chưa cập nhật"}
            readOnly
          />
        </Form.Item>
        <Form.Item label="Địa chỉ">
          <Input
            value={order?.address || user?.address || "Chưa cập nhật"}
            readOnly
          />
        </Form.Item>
        <Form.Item label="Trạng thái đơn hàng">
          <Select value={order?.status} readOnly>
            <Select.Option value="Chờ xác nhận">Chờ xác nhận</Select.Option>
            <Select.Option value="Đang xử lý">Đã duyệt</Select.Option>
            <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
            <Select.Option value="Hủy">Hủy</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Trạng thái thanh toán">
          <Select value={payment?.payment_status} readOnly>
            <Select.Option value="Đã thanh toán">Đã thanh toán</Select.Option>
            <Select.Option value="Chưa thanh toán">
              Chưa thanh toán
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <Skeleton loading={isLoading} active>
        <Table
          dataSource={orderItems}
          columns={columns}
          rowKey="order_item_id"
        />
      </Skeleton>
    </div>
  );
};

export default OrderDetailPage;
