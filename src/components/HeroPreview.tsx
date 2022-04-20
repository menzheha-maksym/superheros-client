import { useEffect, useState } from "react";
import { fetchHeroImage, fetchHeroImagesIds } from "../api/heroAPI";

interface HeroPreviewProps {
  id: number;
  nickname: string;
}

const HeroPreview: React.FC<HeroPreviewProps> = ({ id, nickname }) => {
  const [lastImageId, setLastImageId] = useState<number>();
  const [lastImageSrc, setLastImageSrc] = useState<string>();

  useEffect(() => {
    fetchHeroImagesIds(id).then((res) => {
      if (res.length > 0) {
        setLastImageId(res[res.length - 1]);
      }
    });
  }, [id]);

  useEffect(() => {
    if (lastImageId) {
      fetchHeroImage(lastImageId).then((blob) => {
        setLastImageSrc(URL.createObjectURL(blob));
      });
    }
  }, [lastImageId]);

  return (
    <>
      <div>{id}</div>
      {lastImageSrc ? <img src={lastImageSrc} alt="hero last" /> : null}
      <div>{nickname}</div>
    </>
  );
};

export default HeroPreview;
