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

  if (!data)
    return (
      <div style={{ fontSize: "10pt" }}>
        <i className="fa fa-spinner fa-spin" /> Loading contact info...
      </div>
    );

  const showEmail = data.ShowEmailToMembers && data.Email;

  return (
    <div style={{ fontSize: "10pt" }}>
      <br />

      {showEmail && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Email:</b> {data.Email}
            </span>
          </span>
          <br />
        </>
      )}

      {showEmail && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Other Email:</b> {data.OtherEmail}
            </span>
          </span>
          <br />
        </>
      )}

      {data.Facebook && (
        <>
          <br />
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Facebook:</b>{" "}
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                href={data.Facebook}
              >
                {data.Facebook}
              </a>
            </span>
          </span>
          <br />
        </>
      )}

      {data.Instagram && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Instagram:</b>{" "}
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                href={data.Instagram}
              >
                {data.Instagram}
              </a>
            </span>
          </span>
          <br />
        </>
      )}

      {data.Twitter && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>X:</b>{" "}
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                href={data.Twitter}
              >
                {data.Twitter}
              </a>
            </span>
          </span>
          <br />
        </>
      )}

      {data.Website && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Personal website:</b>{" "}
              <a
                style={{ textDecoration: "none" }}
                target="_blank"
                href={data.Website}
              >
                {data.Website}
              </a>
            </span>
          </span>
          <br />
        </>
      )}

      {data.ShowCellPhone && (
        <>
          {data.CellPhone && (
            <>
              <br />
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Cell Phone:</b> {data.CellPhone}
                </span>
              </span>
              <br />
            </>
          )}
        </>
      )}

      {data.ShowHomePhone && (
        <>
          {data.HomePhone && (
            <>
              <span className="padded-span">
                <span style={{ borderBottom: " solid 1px #e7eadf" }}>
                  <b>Home Phone:</b> {data.HomePhone}
                </span>
              </span>
              <br />
            </>
          )}
        </>
      )}

      {data.ShowAddress && (
        <>
          <br />
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Address:</b> {data.Address}
            </span>
          </span>
          <br />
        </>
      )}

      {data.ShowAddress && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>City/Town:</b> {data.City}
            </span>
          </span>
          <br />
        </>
      )}

      {data.ShowAddress && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>State:</b> {data.State}
            </span>
          </span>
          <br />
        </>
      )}

      {data.ShowAddress && (
        <>
          <span className="padded-span">
            <span style={{ borderBottom: " solid 1px #e7eadf" }}>
              <b>Zip Code:</b> {data.Zip}
            </span>
          </span>
          <br />
        </>
      )}
    </div>
  );
};

export default ContactInfoTab;
