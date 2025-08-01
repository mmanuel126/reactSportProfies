import React, { useEffect, useState } from 'react';
import { getVideosList } from '../../services/memberService';

type Video = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  defaultThumbnail: string;
};

type Props = {
  memberId: string;
};

const VideosTab: React.FC<Props> = ({ memberId }) => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    getVideosList(memberId).then(setVideos);
  }, [memberId]);

  if (!videos.length) return <div style={{fontSize:"10pt"}}><br/>No videos found for this member.</div>;

  return (
    <div>
      {videos.map((vid) => (
        <div key={vid.id} className="mb-3">
          <a href={`https://www.youtube.com/watch?v=${vid.id}`} target="_blank" rel="noreferrer">
            <img src={vid.defaultThumbnail} alt={vid.title} style={{ width: '200px' }} />
            <div><strong>{vid.title}</strong></div>
          </a>
          <div>{vid.description}</div>
          <div><small>Published: {vid.publishedAt}</small></div>
        </div>
      ))}
    </div>
  );
};

export default VideosTab;
