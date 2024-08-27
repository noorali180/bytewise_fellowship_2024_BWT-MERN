import { Box, Stack, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import Videos from "./Videos";
import { useEffect, useState } from "react";
import { fetchFromApi } from "../utils/apiVideos";

function Feed() {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchFromApi(`search?part=snippet,id&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
      .catch((error) => console.log(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedCategory]);

  return (
    <Stack
      component="section"
      sx={{
        flexDirection: { sx: "column", md: "row" },
      }}
    >
      <Box
        component={"aside"}
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{
            mt: 1.5,
            color: "#ffffff",
          }}
        >
          Copyright 2024 Noor Ali
        </Typography>
      </Box>
      <Box
        component="main"
        p={2}
        sx={{
          overflowY: "auto",
          height: "90vh",
          flex: 2,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{
            color: "white",
          }}
        >
          {selectedCategory} <span style={{ color: "#f31503" }}>videos</span>
        </Typography>

        <Videos videos={videos} isLoading={isLoading} />
      </Box>
    </Stack>
  );
}

export default Feed;
