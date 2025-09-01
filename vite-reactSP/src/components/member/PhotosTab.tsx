import React, { useEffect, useState } from "react";
import { getInstagramURL } from "../../services/memberService";

type Props = {
  memberId: string;
  instagramUrl?: string;
};

const PhotosTab: React.FC<Props> = ({ memberId }) => {
  const [instagramUrl, setInstagramUrl] = useState<string>("");

  useEffect(() => {
    (async () => {
      const url = await getInstagramURL(memberId);
      setInstagramUrl(url);
    })();
  }, [memberId]);

  if (!instagramUrl)
    return (
      <div style={{ fontSize: "10pt" }}>
        <br />
        No Instagram photos available.
      </div>
    );

  return (
    <div style={{ fontSize: "10pt" }}>
      <p>
        <br></br>
        This website uses a member's public Instagram posts to display their
        public images.
      </p>
      <a href={instagramUrl} target="_blank" rel="noreferrer">
        View Instagram Profile
      </a>
    </div>
  );
};

export default PhotosTab;
