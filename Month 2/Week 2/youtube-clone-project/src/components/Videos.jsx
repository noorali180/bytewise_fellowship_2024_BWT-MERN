import { Box, Stack } from "@mui/material";
import VideoCard from "./VideoCard";
import ChannelCard from "./ChannelCard";
import Loader from "./Loader";

function Videos({ videos, isLoading, direction = "row" }) {
  if (isLoading) return <Loader />;

  return (
    <Stack
      direction={direction}
      flexWrap={"wrap"}
      justifyContent={"flex-start"}
      gap={2}
    >
      {videos.map((item, idx) => {
        if (item.id.playlistId) return <></>;
        else {
          return (
            <Box key={idx}>
              {item.id.videoId && <VideoCard video={item} />}
              {item.id.channelId && <ChannelCard channelDetail={item} />}
            </Box>
          );
        }
      })}
    </Stack>
  );
}

export default Videos;
