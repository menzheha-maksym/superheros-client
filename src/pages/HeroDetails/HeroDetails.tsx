import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import HeroDescriptionWithActions from "../../components/heroDescription/HeroDescriptionWithActions";
import EditHero from "../../components/editHero/EditHero";

interface HeroDetailsProps {}

const HeroDetails: React.FC<HeroDetailsProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const locatiton = useLocation();

  const fileInputRef = useRef<HTMLInputElement>();

  const [hero, setHero] = useState<Hero>();
  const [isEditing, setIsEditing] = useState(false);
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

  useEffect(() => {
    const thridParam = locatiton.pathname.split("/")[3];
    if (thridParam === "edit") {
      setIsEditing(true);
    } else if (thridParam === "update") {
      setIsEditing(false);
      setHero(locatiton.state as Hero);
      navigate(`/hero/${id}`, { replace: true });
    } else {
      setIsEditing(false);
    }
  }, [locatiton, id, navigate]);

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
        <button
          className={styles["go-back-button"]}
          onClick={() => navigate("/")}
        >
          Go back
        </button>
        {hero ? (
          isEditing ? (
            <EditHero hero={hero} />
          ) : (
            <div className={styles["details-container"]}>
              <HeroLastImage
                heroId={hero.id}
                imageStyle={styles["latest-image"]}
              />
              <div>
                <HeroDescriptionWithActions hero={hero} />
              </div>
            </div>
          )
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
