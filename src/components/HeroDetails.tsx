import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchHeroById } from "../api/heroAPI";
import { Hero } from "../interfaces/Hero";
import HeroLastImage from "./HeroLastImage";
// import styles from "./HeroDetails.module.css";

interface HeroDetailsProps {}

const HeroDetails: React.FC<HeroDetailsProps> = ({}) => {
  const { id } = useParams();

  const [hero, setHero] = useState<Hero>();

  useEffect(() => {
    fetchHeroById(Number(id)).then((hero) => {
      setHero(hero);
    });
  }, [id]);

  return (
    <>
      <div>
        {hero ? (
          <div>
            <HeroLastImage heroId={hero.id} />
            <div>Nickname: {hero.nickname}</div>
            <div>Real name: {hero.real_name}</div>
            <div>Origin description: {hero.origin_description}</div>
            <div>Superpowers: {hero.superpowers}</div>
            <div>Catch phrase: {hero.catch_phrase}</div>
            <div>And images will be here...</div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default HeroDetails;
