import React, { useEffect, useState } from "react";
import { fetchHeros } from "../api/heroAPI";
import HeroPreview from "../components/HeroPreview";
import { Hero } from "../interfaces/Hero";

export default function Dashboard() {
  const [heros, setHeros] = useState<Hero[]>();

  useEffect(() => {
    fetchHeros().then((heros) => {
      setHeros(heros);
    });
  }, []);

  return (
    <div>
      <div>Superheros</div>
      <div>
        {heros?.map((hero, i) => {
          return (
            <HeroPreview key={hero.id} id={hero.id} nickname={hero.nickname} />
          );
        })}
      </div>
    </div>
  );
}
