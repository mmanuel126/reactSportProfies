// src/components/SiteGuide.tsx
import React, { useEffect, useState } from "react";
import { getAds } from "../services/commonService";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Ads } from "../types/common";

const SiteGuide: React.FC = () => {
  const [adsList, setAdsList] = useState<Ads[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      const ads = await getAds("SiteGuide");
      setAdsList(ads);
    };

    fetchAds();
  }, []);

  return (
    <div className="container-fluid">
      <div
        className="sticky-top py-2"
        style={{
          zIndex: 1000,
          backgroundColor: "#fafafa",
          textAlign: "center",
        }}
      >
        <h4
          className="mb-0"
          style={{
            fontSize: "14pt",
            fontWeight: "normal",
            margin: "10px 10px 0px 10px",
          }}
        >
          Site Guide
        </h4>
      </div>

      {/* 👇 Centered Card Container */}
      <div className="d-flex justify-content-center">
        <div
          className="card mb-3"
          style={{
            padding: "10px",
            maxWidth: "620px",
            borderRadius: "1.5rem",
            width: "100%", // optional, ensures responsiveness
          }}
        >
          <div className="scroll-area-lg" style={{ height: "auto" }}>
            {adsList.map((res) => (
              <div key={res.id} style={{ paddingTop: "10px" }}>
                <span
                  style={{
                    color: "#4A6792",
                    fontSize: "11pt",
                    fontWeight: "bold",
                  }}
                >
                  {res.headerText}
                </span>
                <br />
                <div className="d-flex align-items-start mt-2">
                  <img
                    src={`/images/ads/${res.imageUrl}`}
                    alt=""
                    style={{
                      height: "50px",
                      width: "60px",
                      padding: "10px 10px 10px 0px",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "10pt",
                      color: "#696969",
                      paddingLeft: "5px",
                    }}
                  >
                    {res.textField}
                  </div>
                </div>
                <Link
                  to={{
                    pathname:
                      res.id === 4
                        ? "/settings/account"
                        : res.id === 5
                        ? "/settings/privacy"
                        : res.id === 2 || res.id === 3
                        ? `${res.navigateUrl}/${res.id}`
                        : res.navigateUrl,
                  }}
                  state={{ adId: res.id }}
                  className="text-decoration-none"
                >
                  <span style={{ color: "#4A6792", fontSize: "10pt" }}>
                    Click here to get started...
                  </span>
                </Link>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteGuide;
