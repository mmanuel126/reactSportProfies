import React, { useEffect, useState } from "react";
import type { NewsItem } from "../types/news";
import "./RecentNews.css";
import { getRecentNews } from "../services/commonService";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const imageBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

const RecentNews: React.FC = () => {
  const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchNews = async () => {
    setIsRefreshing(true);
    try {
      const data = await getRecentNews();
      setRecentNews(data);
    } catch (err) {
      console.error("Failed to load news:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div
      className="card mb-3 p-0"
      style={{ borderRadius: "1rem", width: "640px" }}
    >
      {/* HEADER with title and refresh icon */}
      <div
        className="card-header d-flex align-items-center justify-content-between bg-white"
        style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
      >
        <div className="card-header-title font-weight-normal text-body-tertiary ">
          What's new?
        </div>

        <OverlayTrigger
          placement="left"
          delay={{ show: 200, hide: 100 }}
          overlay={
            <Tooltip id="refresh-tooltip">
              {isRefreshing ? "Refreshing news..." : "Refresh"}
            </Tooltip>
          }
        >
          <Button
            variant="link"
            className="fs-5 text-dark text-primary"
            title="Refresh"
            onClick={fetchNews}
            disabled={isRefreshing}
          >
            <i
              className={`bi bi-arrow-clockwise ${isRefreshing ? "spin" : ""}`}
            />
          </Button>
        </OverlayTrigger>
      </div>

      {/* News items */}
      <div>
        {recentNews.map((res, index) => (
          <div className="card m-3" key={index}>
            <a href={res.navigateUrl} target="_blank" rel="noopener noreferrer">
              <img
                className="card-img-top"
                src={res.imageUrl.replace("~", imageBaseUrl)}
                alt=""
              />
            </a>
            <div className="card-body">
              <span
                style={{
                  fontSize: "12pt",
                  fontWeight: "normal",
                  textDecoration: "none",
                }}
              >
                <a
                  href={res.navigateUrl}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  rel="noopener noreferrer"
                >
                  {res.headerText}
                </a>
              </span>
              <br />
              <small>Posted Date: {res.postingDate}</small>
              <br />
              <span style={{ color: "gray", fontSize: "10pt" }}>
                {res.textField}…&nbsp;
                <span style={{ fontSize: "8pt" }}>
                  <a
                    href={res.navigateUrl}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                    rel="noopener noreferrer"
                  >
                    Details
                  </a>
                </span>
                <a
                  href={`http://www.${res.navigateUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span style={{ fontSize: "7pt", fontWeight: "bold" }}>
                    {">>"}
                  </span>
                </a>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNews;
