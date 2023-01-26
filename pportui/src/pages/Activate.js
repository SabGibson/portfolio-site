import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axiosInstance from "../api/axios";

const ActivateEmail = () => {
  const onActivate = () => {
    axiosInstance.push();
  };
  return (
    <Box
      component={"div"}
      sx={{ display: "flexbox", justifyContent: "center" }}
    >
      <Typography variant="h3">Activate your account!</Typography>
      <Button variant="contained" size="large" sx={{ m: "auto" }}>
        Verify
      </Button>
      <Typography variant="body2">
        Please use the button above to activate account & full site features
      </Typography>
    </Box>
  );
};

export default ActivateEmail;
