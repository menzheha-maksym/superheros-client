import React, { useEffect, useState } from "react";
import { fetchHerosWithPagiantion } from "../api/heroAPI";
import HeroPreview from "../components/HeroPreview";
import { Hero } from "../interfaces/Hero";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [heros, setHeros] = useState<Hero[]>();

  useEffect(() => {
    fetchHerosWithPagiantion().then((res) => {
      setHeros(res.data);
    });
  }, []);

  return (
    <div>
      <div>Superheros</div>
      <div className={styles["heros-container"]}>
        {heros?.map((hero, i) => {
          return (
            <HeroPreview key={hero.id} id={hero.id} nickname={hero.nickname} />
          );
        })}
      </div>
    </div>
  );
}
