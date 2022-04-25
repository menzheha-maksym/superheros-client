import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteHero } from "../../api/heroAPI";
import { Hero } from "../../interfaces/Hero";
import styles from "./HeroDescriptionWithActions.module.css";

interface HeroDescriptionWithActionsProps {
  hero: Hero;
}

const HeroDescriptionWithActions: React.FC<HeroDescriptionWithActionsProps> = ({
  hero,
}) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  function handleEditHero() {
    navigate(`/hero/${hero.id}/edit`);
  }

  async function handleDeleteHero() {
    try {
      if (hero) {
        await deleteHero(hero.id).then((res) => {
          navigate("/", { replace: true });
        });
      }
    } catch (err) {
      console.log(err);
    }
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
      {!isDeleting ? (
        <button
          className={styles["delete-hero-button"]}
          onClick={() => setIsDeleting(true)}
        >
          Delete hero
        </button>
      ) : (
        <div className={styles["confirm-delete-container"]}>
          <div>Are you sure?</div>
          <button
            className={styles["confirm-delete"]}
            onClick={handleDeleteHero}
          >
            YES
          </button>
          <button
            className={styles["undo-delete"]}
            onClick={() => setIsDeleting(false)}
          >
            NO
          </button>
        </div>
      )}
    </div>
  );
};

export default HeroDescriptionWithActions;
