import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants.js";
import Searchbar from "./Searchbar.jsx";

function Navbar() {
  return (
    <Stack
      component={"nav"}
      direction={"row"}
      alignItems={"center"}
      p={2}
      sx={{
        position: "sticky",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
      </Link>
      <Searchbar />
    </Stack>
  );
}

export default Navbar;
