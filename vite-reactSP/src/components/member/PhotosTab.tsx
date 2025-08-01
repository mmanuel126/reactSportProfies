import React from 'react';

type Props = {
  memberId: string;
  instagramUrl?: string;
};

const PhotosTab: React.FC<Props> = ({ instagramUrl }) => {
  if (!instagramUrl) {
    return <div style={{fontSize:"10pt"}}><br/>No Instagram photos available.</div>;
  }

  return (
    <div>
      <p>
        This website uses a member's public Instagram posts to display their public images.
      </p>
      <a href={instagramUrl} target="_blank" rel="noreferrer">
        View Instagram Profile
      </a>
    </div>
  );
};

export default PhotosTab;
