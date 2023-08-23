import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box className="layout" sx={{minHeight:"100vh", width:"100%"}}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Box>
  );
};

export default Layout;