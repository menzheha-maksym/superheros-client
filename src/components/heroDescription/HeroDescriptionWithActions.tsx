import { useNavigate } from "react-router-dom";
import { Hero } from "../../interfaces/Hero";
import styles from "./HeroDescriptionWithActions.module.css";

interface HeroDescriptionWithActionsProps {
  hero: Hero;
}

const HeroDescriptionWithActions: React.FC<HeroDescriptionWithActionsProps> = ({
  hero,
}) => {
  const navigate = useNavigate();

  function handleEditHero() {
    navigate(`/hero/${hero.id}/edit`);
  }

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

export default HeroDescriptionWithActions;
