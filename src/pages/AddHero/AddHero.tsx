import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postCreateHero } from "../../api/heroAPI";
import { postHeroImage } from "../../api/heroImageAPI";
import styles from "./AddHero.module.css";

export default function AddHero() {
  const [nickname, setNickname] = useState<string>("");
  const [real_name, setReal_name] = useState<string>("");
  const [origin_description, setOrigin_description] = useState<string>("");
  const [superpowers, setSuperpowers] = useState<string>("");
  const [catch_phrase, setCatch_phrase] = useState<string>("");
  const [heroImg, setHeroImg] = useState<File | null>();

  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();

    const hero = {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
    };

    try {
      await postCreateHero(hero).then(async (res) => {
        if (!heroImg) {
          navigate(`/hero/${res.id}`);
        } else {
          const data = new FormData();
          data.append("file", heroImg);
          await postHeroImage(res.id, data).then(() => {
            navigate(`/hero/${res.id}`);
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["sub-container"]}>
        <button
          className={styles["go-back-button"]}
          onClick={() => navigate(`/`)}
        >
          GO BACK
        </button>
        <form onSubmit={handleSubmit} className={styles["form"]}>
          <span>Nickname</span>
          <input
            type="text"
            name="nickname"
            value={nickname}
            required={true}
            onChange={(e) => setNickname(e.target.value)}
          />

          <span>Real name</span>
          <input
            type="text"
            name="real_name"
            value={real_name}
            required={true}
            onChange={(e) => setReal_name(e.target.value)}
          />

          <span>Origin description</span>
          <textarea
            rows={4}
            name="origin_description"
            value={origin_description}
            required={true}
            onChange={(e) => setOrigin_description(e.target.value)}
          />

          <span>Superpowers</span>
          <textarea
            rows={4}
            name="superpowers"
            value={superpowers}
            required={true}
            onChange={(e) => setSuperpowers(e.target.value)}
          />

          <span>Catch Phrase</span>
          <textarea
            rows={2}
            name="superpowers"
            value={catch_phrase}
            required={true}
            onChange={(e) => setCatch_phrase(e.target.value)}
          />

          <span>Hero Image</span>
          <input
            type="file"
            accept="image/*"
            alt="hero"
            name="hero_image"
            onChange={(e) => setHeroImg(e.target.files![0])}
          />

          <button type="submit">Add a hero</button>
        </form>
      </div>
    </div>
  );
}
