import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromApi } from "../utils/apiVideos";
import { Box } from "@mui/material";
import ChannelCard from "./ChannelCard";
import Videos from "./Videos";

function ChannelDetail() {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromApi(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data.items[0])
    );

    fetchFromApi(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);
  console.log(videos);
  return (
    <Box minHeight={"95vh"}>
      <Box>
        <div
          style={{
            backgroundImage: "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop={"-110px"} />
      </Box>

      <Box display="flex" p={2}>
        <Box
          sx={{
            mx: { md: "100px" },
          }}
        />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
}

export default ChannelDetail;
