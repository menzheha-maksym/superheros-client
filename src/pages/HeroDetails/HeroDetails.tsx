import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteHero,
  fetchHeroById,
  fetchHeroImagesIds,
  postHeroImage,
} from "../../api/heroAPI";
import { Hero } from "../../interfaces/Hero";
import HeroImage from "../../components/HeroImage";
import HeroLastImage from "../../components/HeroLastImage";
import styles from "./HeroDetails.module.css";
import React from "react";
import HeroDescription from "../../components/heroDescription/HeroDescription";
import EditHero from "../../components/editHero/EditHero";

interface HeroDetailsProps {}

const HeroDetails: React.FC<HeroDetailsProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  async function handleDeleteHero() {
    try {
      if (hero) {
        await deleteHero(hero.id).then((res) => {
          navigate("/", { replace: true });
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  function updateIsEditing(isEditing: boolean): void {
    setIsEditing(isEditing);
  }

  return (
    <>
      <div>
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
                <HeroDescription setIsEditing={updateIsEditing} hero={hero} />
                <button
                  className={styles["delete-hero-button"]}
                  onClick={handleDeleteHero}
                >
                  Delete hero
                </button>
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
