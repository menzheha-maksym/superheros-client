import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  fetchHeroImagesIds,
  postHeroImage,
  deleteHeroImage,
} from "../../api/heroImageAPI";
import { Hero } from "../../interfaces/Hero";
import HeroImage from "../../components/HeroImage";
import styles from "./HeroDetails.module.css";
import React from "react";
import HeroDescriptionWithActions from "../../components/heroDescription/HeroDescriptionWithActions";
import EditHero from "../../components/editHero/EditHero";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchHeroByIdAsync,
  selectHero,
  setHero,
} from "../../redux/reducers/heroSlice";

interface HeroDetailsProps {}

const HeroDetails: React.FC<HeroDetailsProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const locatiton = useLocation();

  const dispatch = useAppDispatch();
  const hero = useAppSelector(selectHero);

  const fileInputRef = useRef<HTMLInputElement>();

  const [isEditing, setIsEditing] = useState(false);
  const [imageIds, setImageIds] = useState<number[]>();
  const [lastImageId, setLastImageId] = useState<number>();

  useEffect(() => {
    // can just take the hero from redux store ?
    dispatch(fetchHeroByIdAsync(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    fetchHeroImagesIds(Number(id)).then((ids) => {
      setImageIds(ids);
      if (ids) {
        setLastImageId(ids[ids.length - 1]);
      }
    });
  }, [id]);

  useEffect(() => {
    const thridParam = locatiton.pathname.split("/")[3];
    if (thridParam === "edit") {
      setIsEditing(true);
    } else if (thridParam === "update") {
      setIsEditing(false);
      dispatch(setHero(locatiton.state as Hero));
      navigate(`/hero/${id}`, { replace: true });
    } else {
      setIsEditing(false);
    }
  }, [locatiton, id, navigate, dispatch]);

  async function handleAddImageToHero(e: any) {
    try {
      if (hero) {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        await postHeroImage(hero.id, data).then((res) => {
          setLastImageId(res.id);
          setImageIds((ids) => [...ids!, res.id]);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteHeroImage(id: number) {
    try {
      await deleteHeroImage(id).then(() => {
        const ids = imageIds!.filter((imageId) => imageId !== id);
        setImageIds(ids);
        if (!ids.includes(lastImageId!)) {
          setLastImageId(ids[ids.length - 1]);
        }
        console.log("deleted hero image");
      });
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
              {lastImageId ? (
                <HeroImage
                  imageId={lastImageId}
                  imageStyle={styles["latest-image"]}
                />
              ) : null}
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
            ? imageIds.reverse().map((id, i) => {
                return (
                  <div key={id} className={styles["single-image-container"]}>
                    <HeroImage imageId={id} imageStyle={styles["hero-image"]} />
                    <div className={styles["delete-image-button-container"]}>
                      <button
                        className={styles["delete-image-button"]}
                        onClick={() => handleDeleteHeroImage(id)}
                      >
                        Delete Image
                      </button>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default HeroDetails;
