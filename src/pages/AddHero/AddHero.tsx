import React, { useState } from "react";
import { postCreateHero } from "../../api/heroAPI";
import styles from "./AddHero.module.css";

export default function AddHero() {
  const [nickname, setNickname] = useState<string>("");
  const [real_name, setReal_name] = useState<string>("");
  const [origin_description, setOrigin_description] = useState<string>("");
  const [superpowers, setSuperpowers] = useState<string>("");
  const [catch_phrase, setCatch_phrase] = useState<string>("");

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
      await postCreateHero(hero).then((res) => {
        console.log(res);
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles["container"]}>
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

        <button type="submit">Add a hero</button>
      </form>
    </div>
  );
}
