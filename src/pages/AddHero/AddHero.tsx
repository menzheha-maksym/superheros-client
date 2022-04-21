import React, { useState } from "react";
import styles from "./AddHero.module.css";

export default function AddHero() {
  const [nickname, setNickname] = useState<string>("");
  const [real_name, setReal_name] = useState<string>("");
  const [origin_description, setOrigin_description] = useState<string>("");
  const [superpowers, setSuperpowers] = useState<string>("");
  const [catch_phrase, setCatch_phrase] = useState<string>("");

  function handleSubmit(e: any) {
    e.preventDefault();

    console.log(nickname);
    console.log(real_name);
    console.log(origin_description);
    console.log(superpowers);
    console.log(catch_phrase);
  }

  return (
    <div className={styles["container"]}>
      <form onSubmit={handleSubmit} className={styles["form"]}>
        <span>Nickname</span>
        <input
          type="text"
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <span>Real name</span>
        <input
          type="text"
          name="real_name"
          value={real_name}
          onChange={(e) => setReal_name(e.target.value)}
        />
        <span>Origin description</span>
        <textarea
          rows={4}
          name="origin_description"
          value={origin_description}
          onChange={(e) => setOrigin_description(e.target.value)}
        />
        <span>Superpowers</span>
        <textarea
          rows={4}
          name="superpowers"
          value={superpowers}
          onChange={(e) => setSuperpowers(e.target.value)}
        />
        <span>Catch Phrase</span>
        <textarea
          rows={2}
          name="superpowers"
          value={catch_phrase}
          onChange={(e) => setCatch_phrase(e.target.value)}
        />

        <button type="submit">Add a hero</button>
      </form>
    </div>
  );
}
