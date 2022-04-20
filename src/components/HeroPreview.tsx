import { useEffect, useState } from "react";
import { fetchHeroImagesIds } from "../api/heroAPI";

interface HeroPreviewProps {
  id: number;
  nickname: string;
}

const HeroPreview: React.FC<HeroPreviewProps> = ({ id, nickname }) => {
  const [lastImageId, setLastImageId] = useState<number>();

  useEffect(() => {
    fetchHeroImagesIds(id).then((res) => {
      if (res.length > 0) {
        setLastImageId(res[res.length - 1]);
      }
    });
  }, [id]);

  useEffect(() => {
    if (lastImageId) {
    }
  }, [lastImageId]);

  return (
    <>
      <div>{id}</div>

      <div>{nickname}</div>
    </>
  );
};

export default HeroPreview;
