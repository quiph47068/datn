import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../Components/Header";

const { Content } = Layout;

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <HeaderAdmin />
        <Content
          style={{ margin: "20px", background: "#fff", padding: "20px" }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
