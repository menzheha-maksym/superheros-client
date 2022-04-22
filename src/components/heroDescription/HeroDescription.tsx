import { Hero } from "../../interfaces/Hero";
import styles from "./HeroDescription.module.css";

interface HeroDescriptionProps {
  hero: Hero;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({ hero }) => {
  function handleEditHero() {}

  return (
    <div>
      <div className={styles["text-description"]}>
        <div>
          <span>Nickname:</span> {hero.nickname}
        </div>
        <div>
          <span>Real name:</span> {hero.real_name}
        </div>
        <div>
          <span>Origin description:</span> {hero.origin_description}
        </div>
        <div>
          <span>Superpowers:</span> {hero.superpowers}
        </div>
        <div>
          <span>Catch phrase:</span> {hero.catch_phrase}
        </div>
      </div>
      <button className={styles["edit-hero-button"]} onClick={handleEditHero}>
        Edit hero
      </button>
    </div>
  );
};

export default HeroDescription;
