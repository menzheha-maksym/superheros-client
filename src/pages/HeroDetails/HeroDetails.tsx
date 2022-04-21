import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchHeroById,
  fetchHeroImagesIds,
  postHeroImage,
} from "../../api/heroAPI";
import { Hero } from "../../interfaces/Hero";
import HeroImage from "../../components/HeroImage";
import HeroLastImage from "../../components/HeroLastImage";
import styles from "./HeroDetails.module.css";
import React from "react";

interface HeroDetailsProps {}

const HeroDetails: React.FC<HeroDetailsProps> = () => {
  const { id } = useParams();

  const fileInputRef = useRef<HTMLInputElement>();

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

  async function handleAddImageToHero(e: any) {
    try {
      if (hero) {
        const data = new FormData();
        data.append("heroId", String(hero.id));
        data.append("file", e.target.files[0]);
        await postHeroImage(data).then((id) => {
          //console.log(id);
          // must add image id to ids
          // but id is not being returned for unknown reason
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

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
        <button
          className={styles["add-image-to-hero-button"]}
          onClick={() => fileInputRef.current!.click()}
        >
          Add an image to hero
        </button>

        <input
          type="file"
          // @ts-ignore wasting of time
          ref={fileInputRef}
          onChange={handleAddImageToHero}
          hidden
        />
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
