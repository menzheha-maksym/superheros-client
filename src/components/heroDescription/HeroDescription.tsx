import { useNavigate } from "react-router-dom";
import { Hero } from "../../interfaces/Hero";
import styles from "./HeroDescription.module.css";

interface HeroDescriptionProps {
  hero: Hero;
  setIsEditing: (isEditing: boolean) => void;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({
  hero,
  setIsEditing,
}) => {
  const navigate = useNavigate();

  function handleEditHero() {
    setIsEditing(true);
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

export default HeroDescription;
