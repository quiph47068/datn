import { Layout } from "antd";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
const { Content } = Layout;

const WebsiteLayout = ({}) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Content style={{ padding: "0px" }}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default WebsiteLayout;
