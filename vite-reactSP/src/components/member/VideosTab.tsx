import React, { useEffect, useState } from "react";
import { getPlaylistVideos, getVideosList } from "../../services/memberService";
import type { PlaylistInfo, VideoInfo } from "../../types/member";

type Props = {
  memberId: string;
};

const VideosTab: React.FC<Props> = ({ memberId }) => {
  const [videos, setVideos] = useState<PlaylistInfo[]>([]);

  const [videosList, setVideosList] = useState<VideoInfo[]>([]); // selected playlist videos
  const [vidCount, setVidCount] = useState(0);

  useEffect(() => {
    getVideosList(memberId).then(setVideos);
  }, [memberId]);

  const onPlayListChange = async (playlistId: string) => {
    try {
      const result = await getPlaylistVideos(playlistId);
      setVideosList(result);
      setVidCount(result.length);
    } catch (error) {
      console.error("Failed to load videos:", error);
      setVideosList([]);
      setVidCount(0);
    }
  };

  if (!videos.length)
    return (
      <div style={{ fontSize: "10pt" }}>
        <br />
        No videos found for this member.
      </div>
    );

  return (
    <div>
      {videos?.length > 0 ? (
        <span className="textDataLabel">
          <br />
          We use a member's public YouTube playlists to show and play their
          showcase videos.
          <br />
          <br />
          <b>Select playlist:</b>&nbsp;
          <div className="scrollmenu">
            <div className="playlist-scroll-container">
              {videos.map((item) => (
                <div
                  key={item.id}
                  className="playlist-item"
                  onClick={() => onPlayListChange(item.id)}
                  title={item.description}
                >
                  <img
                    src={item.defaultThumbnail}
                    alt={item.title}
                    style={{ width: "100%" }}
                  />
                  <div>{item.title}</div>
                </div>
              ))}
            </div>
          </div>
          <hr style={{ backgroundColor: "lightgray" }} />
        </span>
      ) : (
        <span className="textDataLabel" style={{ width: "250px" }}>
          No YouTube playlists were found for this member.
        </span>
      )}

      <div id="VideosContentPanel" style={{ paddingTop: "10px" }}>
        <table>
          {videosList.map((vid) => (
            <tr key={vid.id}>
              <td style={{ paddingLeft: "10px" }}>
                <table style={{ textAlign: "left" }}>
                  <tr>
                    <td
                      style={{
                        width: "50px",
                        textAlign: "left",
                        cursor: "pointer",
                        verticalAlign: "top",
                      }}
                    >
                      <a
                        href={`https://www.youtube.com/watch?v=${vid.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          style={{
                            color: "#596A7D",
                            borderColor: "LightGrey",
                            borderWidth: 1,
                            borderStyle: "None",
                            height: `${vid.defaultThumbnailHeight}px`,
                            width: `${vid.defaultThumbnailWidth}px`,
                          }}
                          src={vid.defaultThumbnail}
                          alt=""
                        />
                      </a>
                    </td>
                    <td>
                      <span style={{ width: "5px" }}></span>
                    </td>
                    <td
                      style={{
                        verticalAlign: "top",
                        textAlign: "left",
                        width: "100%",
                      }}
                      className="textDataLabel"
                    >
                      <a
                        id="lblTitle"
                        href={`https://www.youtube.com/watch?v=${vid.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontWeight: "normal", paddingRight: "20px" }}
                      >
                        {vid.title}
                      </a>
                      <br />
                      <span id="lblDesc" style={{ color: "gray" }}>
                        {vid.description}
                      </span>
                      <br />
                      <span id="lblDate" style={{ color: "#596A7D" }}>
                        Published date:&nbsp;{vid.publishedAt}
                      </span>
                      <br />
                    </td>
                    <td
                      style={{
                        verticalAlign: "top",
                        textAlign: "right",
                        width: "20%",
                      }}
                    ></td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
          ))}

          {vidCount === 0 && (
            <tr>
              <td>No videos found.</td>
            </tr>
          )}

          <tr>
            <td>&nbsp;</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default VideosTab;
