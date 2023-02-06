import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  setTimeout(navigate("/"), 5000);
  return (
    <Box component={"div"}>
      <Typography varient="h3">404 Error !</Typography>
      <Typography varient="body2">This page does not exist. Sorry</Typography>
    </Box>
  );
};

export default Error;
