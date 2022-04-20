import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchHeroById, fetchHeroImagesIds } from "../../api/heroAPI";
import { Hero } from "../../interfaces/Hero";
import HeroImage from "../HeroImage";
import HeroLastImage from "../HeroLastImage";
import styles from "./HeroDetails.module.css";

interface HeroDetailsProps {}

const HeroDetails: React.FC<HeroDetailsProps> = () => {
  const { id } = useParams();

  const [hero, setHero] = useState<Hero>();
  const [imageIds, setImageIds] = useState<number[]>();

  useEffect(() => {
    fetchHeroById(Number(id)).then((hero) => {
      setHero(hero);
    });
  }, [id]);

  useEffect(() => {
    fetchHeroImagesIds(Number(id)).then((ids) => {
      setImageIds(ids);
    });
  }, [id]);

  return (
    <>
      <div>
        {hero ? (
          <div className={styles["details-container"]}>
            <HeroLastImage
              heroId={hero.id}
              imageStyle={styles["latest-image"]}
            />
            <div className={styles["text-description"]}>
              <div>
                <span>Nickname:</span> {hero.nickname}
              </div>
              <div>
                <span>Real name:</span> {hero.real_name}
              </div>
              <div>
                <span>Origin description:</span> {hero.origin_description}
              </div>
              <div>
                <span>Superpowers:</span> {hero.superpowers}
              </div>
              <div>
                <span>Catch phrase:</span> {hero.catch_phrase}
              </div>
            </div>
          </div>
        ) : null}
        <h2>Hero images</h2>
        <div className={styles["hero-images-container"]}>
          {imageIds
            ? imageIds.map((id, i) => {
                return (
                  <HeroImage
                    key={id}
                    imageId={id}
                    imageStyle={styles["hero-image"]}
                  />
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default HeroDetails;
