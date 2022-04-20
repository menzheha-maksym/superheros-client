import { useEffect, useState } from "react";
import { fetchHeroImage } from "../api/heroAPI";

interface HeroImageProps {
  imageId: number;
  imageStyle?: string | undefined;
}

const HeroImage: React.FC<HeroImageProps> = ({ imageId, imageStyle }) => {
  const [imageURL, setImageURL] = useState<string>();

  useEffect(() => {
    fetchHeroImage(imageId).then((blob) => {
      setImageURL(URL.createObjectURL(blob));
    });
  }, [imageId]);
  return (
    <>
      <div>
        {imageURL ? (
          <img src={imageURL} className={imageStyle} alt="hero" />
        ) : null}
      </div>
    </>
  );
};

export default HeroImage;
