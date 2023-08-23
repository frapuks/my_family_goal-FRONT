import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar/NavBar";

const Layout = () => {
  const token = useSelector(state => state.user.token);

  return (
    <Box className="layout" sx={{minHeight:"100vh", width:"100%", paddingBottom:10}}>
      <Header />
      <main>
        <Outlet />
      </main>
      {token && <NavBar />}
    </Box>
  );
};

export default Layout;