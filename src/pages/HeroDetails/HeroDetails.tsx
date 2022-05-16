import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditHero from "../../components/editHero/EditHero";
import HeroDescriptionWithActions from "../../components/heroDescription/HeroDescriptionWithActions";
import HeroImage from "../../components/HeroImage";
import { Hero } from "../../interfaces/Hero";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addHeroImageAsync,
  deleteHeroImageByIdAsync,
  fetchHeroByIdAsync,
  fetchHeroImagesIdsAsync,
  resetHero,
  selectHero,
  selectHeroImagesIds,
  selectHeroLastImageId,
  setHero,
} from "../../redux/reducers/heroSlice";
import styles from "./HeroDetails.module.css";

interface HeroDetailsProps {}

const HeroDetails: React.FC<HeroDetailsProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const locatiton = useLocation();

  const dispatch = useAppDispatch();
  const hero = useAppSelector(selectHero);
  const heroImagesIds = useAppSelector(selectHeroImagesIds);
  const lastImageId = useAppSelector(selectHeroLastImageId);

  const fileInputRef = useRef<HTMLInputElement>();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(resetHero());
  }, [dispatch]);

  useEffect(() => {
    // can just take the hero from redux store ?
    dispatch(fetchHeroByIdAsync(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchHeroImagesIdsAsync(Number(id)));
  }, [dispatch, id]);

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

  function handleAddImageToHero(e: any) {
    if (hero) {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      dispatch(addHeroImageAsync({ heroId: Number(id), data: data }));
    }
  }

  function handleDeleteHeroImage(id: number) {
    dispatch(deleteHeroImageByIdAsync(id));
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
          {heroImagesIds.length > 0
            ? heroImagesIds.map((id, i) => {
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
