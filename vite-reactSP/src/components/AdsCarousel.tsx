// src/components/AdsCarousel.tsx
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAds } from "../services/commonService";
import type { Ads } from "../types/common";

const AdsCarousel: React.FC = () => {
  const [adsList, setAdsList] = useState<Ads[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      const ads = await getAds("SiteGuide");
      setAdsList(ads);
    };
    fetchAds();
  }, []);

  return (
    <div className="card mb-3 p-0" style={{ borderRadius: "1rem" }}>
      {/* HEADER with title  */}
      <div
        className="card-header d-flex align-items-center justify-content-between bg-white"
        style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
      >
        <div className="card-header-title font-weight-normal text-body-tertiary ">
          Site Guide
        </div>
      </div>

      <div
        className="scroll-area-lg"
        style={{ height: "auto", padding: "0px 10px 10px 10px" }}
      >
        <Carousel
          interval={5000} // ⏱ 5 seconds per slide
          pause={false} // keeps auto-playing
          indicators={false} // hides small indicator dots
          controls={true} // shows prev/next arrows
          fade={false} // set to true for fading transitions
        >
          {adsList.map((res) => (
            <Carousel.Item key={res.id}>
              <div style={{ paddingTop: "10px", textAlign: "left" }}>
                <Link
                  to={{
                    pathname:
                      res.id === 4
                        ? "/settings/account"
                        : res.id === 5
                        ? "/settings/privacy"
                        : res.id === 2 || res.id === 3
                        ? `${res.navigateurl}/${res.id}`
                        : res.navigateurl,
                  }}
                  state={{ adId: res.id }}
                  style={{ textDecoration: "none" }}
                >
                  <span
                    style={{
                      color: "#4A6792",
                      fontSize: "11pt",
                      fontWeight: "bold",
                    }}
                  >
                    {res.headertext}
                  </span>
                  <div className="d-flex align-items-start mt-2">
                    <img
                      src={`/images/ads/${res.imageurl}`}
                      alt=""
                      style={{
                        height: "50px",
                        width: "60px",
                        borderWidth: 0,
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
                      {res.textfield}
                    </div>
                  </div>
                  <span
                    style={{
                      color: "#4A6792",
                      fontSize: "10pt",
                      fontWeight: "normal",
                    }}
                  >
                    Click here to get started.
                  </span>
                </Link>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default AdsCarousel;
