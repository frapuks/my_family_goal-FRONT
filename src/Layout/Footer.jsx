import { Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Stack component="footer" direction='row' justifyContent="center" alignItems="center" sx={{position:'sticky', top:"100%", height:"10vh", width:"100%", backgroundColor:"primary.dark", marginTop:"1rem"}}>
      <Typography variant="overline">Frapuks - 2023</Typography>
    </Stack>
  );
};

export default Footer;