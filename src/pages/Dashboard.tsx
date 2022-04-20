import React, { useEffect, useState } from "react";
import { fetchHerosWithPagiantion } from "../api/heroAPI";
import HeroPreview from "../components/heroPreview/HeroPreview";
import { Hero } from "../interfaces/Hero";
import Pagination from "../utils/Pagination";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const limit = 5;

  const [heros, setHeros] = useState<Hero[]>();
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    fetchHerosWithPagiantion(limit, skip).then((res) => {
      setHeros(res.data);
      setItemsCount(res.count);
    });
  }, [skip]);

  function updateSkip(skip: number) {
    setSkip(skip);
  }

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
      <Pagination
        itemsCount={itemsCount}
        itemsPerPage={limit}
        updateSkip={updateSkip}
        skip={skip}
      />
    </div>
  );
}
