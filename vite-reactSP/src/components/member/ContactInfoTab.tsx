import React, { useEffect, useState } from "react";
import { getContactInfo } from "../../services/memberService";
import type { ContactInfo } from "../../types/member";

type Props = {
  memberId: string;
};

const ContactInfoTab: React.FC<Props> = ({ memberId }) => {
  const [data, setData] = useState<ContactInfo | null>(null);

  useEffect(() => {
    getContactInfo(memberId).then(setData);
  }, [memberId]);

  if (!data) return <div style ={{fontSize:"10pt"}}><i className="fa fa-spinner fa-spin" />  Loading contact info...</div>;

  const showEmail = data.showEmailToMembers && data.email;

  return (
    <div style={{ fontSize: "10pt" }}>
      <br />

      {showEmail && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Email:</b> {data.email}
            </span>
          </span>
          <br />
        </>
      )}

      {showEmail && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Other Email:</b> {data.otherEmail}
            </span>
          </span>
          <br />
        </>
      )}

      {data.facebook && (
        <>
          <br />
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Facebook:</b>{" "}
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                href={data.facebook}
              >
                {data.facebook}
              </a>
            </span>
          </span>
          <br />
        </>
      )}

      {data.instagram && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Instagram:</b>{" "}
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                href={data.instagram}
              >
                {data.instagram}
              </a>
            </span>
          </span>
          <br />
        </>
      )}

      {data.twitter && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>X:</b>{" "}
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                href={data.twitter}
              >
                {data.twitter}
              </a>
            </span>
          </span>
          <br />
        </>
      )}

      {data.website && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Personal website:</b>{" "}
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                href={data.website}
              >
                {data.website}
              </a>
            </span>
          </span>
          <br />
        </>
      )}

      {data.showCellPhone && (
        <>
          {data.cellPhone && (
            <>
              <br />
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Cell Phone:</b> {data.cellPhone}
                </span>
              </span>
              <br />
            </>
          )}
        </>
      )}

      {data.showHomePhone && (
        <>
          {data.homePhone && (
            <>
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Home Phone:</b> {data.homePhone}
                </span>
              </span>
              <br />
            </>
          )}
        </>
      )}

      {data.showAddress && (
        <>
          <br />
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Address:</b> {data.address}
            </span>
          </span>
          <br />
        </>
      )}

      {data.showAddress && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>City/Town:</b> {data.city}
            </span>
          </span>
          <br />
        </>
      )}

      {data.showAddress && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>State:</b> {data.state}
            </span>
          </span>
          <br />
        </>
      )}

      {data.showAddress && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Zip Code:</b> {data.zip}
            </span>
          </span>
          <br />
        </>
      )}

    </div>
  );
};

export default ContactInfoTab;
