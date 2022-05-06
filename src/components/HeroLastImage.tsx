import { useEffect, useState } from "react";
import { fetchHeroImage, fetchHeroImagesIds } from "../api/heroImageAPI";

interface HeroLastImageProps {
  heroId: number;
  imageStyle?: string | undefined;
  imageSrcURL?: string;
}

const HeroLastImage: React.FC<HeroLastImageProps> = ({
  heroId,
  imageStyle,
  imageSrcURL,
}) => {
  const [lastImageId, setLastImageId] = useState<number>();
  const [lastImageSrc, setLastImageSrc] = useState<string>();

  useEffect(() => {
    fetchHeroImagesIds(heroId).then((res) => {
      if (res.length > 0) {
        setLastImageId(res[res.length - 1]);
      }
    });
  }, [heroId]);

  useEffect(() => {
    if (imageSrcURL) {
      setLastImageSrc(imageSrcURL);
    } else if (lastImageId) {
      fetchHeroImage(lastImageId).then((blob) => {
        setLastImageSrc(URL.createObjectURL(blob));
      });
    }
  }, [imageSrcURL, lastImageId]);
  return (
    <>
      <div>
        {lastImageSrc ? (
          <img src={lastImageSrc} alt="hero last" className={imageStyle} />
        ) : null}
      </div>
    </>
  );
};

export default HeroLastImage;
