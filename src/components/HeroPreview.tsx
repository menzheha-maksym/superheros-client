import { useEffect, useState } from "react";
import { fetchHeroImage, fetchHeroImagesIds } from "../api/heroAPI";
import styles from "./HeroPreview.module.css";

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
      <div className={styles["container"]}>
        <div>
          {lastImageSrc ? (
            <img
              src={lastImageSrc}
              className={styles["hero-image"]}
              alt="hero last"
            />
          ) : null}
          <div>nickname: {nickname}</div>
        </div>
      </div>
    </>
  );
};

export default HeroPreview;
