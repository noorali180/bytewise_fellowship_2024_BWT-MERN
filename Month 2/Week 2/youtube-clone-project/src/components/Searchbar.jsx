import { Search } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";

function Searchbar() {
  return (
    <Paper
      component="form"
      onSubmit={() => {}}
      sx={{
        borderRadius: 20,
        border: "1px solid #e3e3e3",
        pl: 2,
        boxShadow: "none",
        mr: { sm: 5 },
      }}
    >
      <input type="text" placeholder="Search..." className="search-bar" />
      <IconButton type="submit" sx={{ p: "10px", color: "red" }}>
        <Search />
      </IconButton>
    </Paper>
  );
}

export default Searchbar;
