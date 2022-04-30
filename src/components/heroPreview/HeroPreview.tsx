import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHeroImagesIds } from "../../api/heroAPI";
import HeroLastImage from "../HeroLastImage";
import styles from "./HeroPreview.module.css";

interface HeroPreviewProps {
  id: number;
  nickname: string;
}

const HeroPreview: React.FC<HeroPreviewProps> = ({ id, nickname }) => {
  const [lastImageId, setLastImageId] = useState<number>();

  const navigate = useNavigate();

  useEffect(() => {
    fetchHeroImagesIds(id).then((res) => {
      if (res.length > 0) {
        setLastImageId(res[res.length - 1]);
      }
    });
  }, [id]);

  return (
    <>
      <div className={styles["container"]}>
        <div>
          <div className={styles["hero-image-container"]}>
            {lastImageId ? (
              <HeroLastImage heroId={id} imageStyle={styles["hero-image"]} />
            ) : (
              <div className={styles["image-placeholder"]}>
                <span>currenty there is no hero image </span>
              </div>
            )}
          </div>
          <div className={styles["nickname"]}>nickname: {nickname}</div>
          <button
            className={styles["view-details"]}
            onClick={() => navigate(`/hero/${id}`)}
          >
            View details
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroPreview;
