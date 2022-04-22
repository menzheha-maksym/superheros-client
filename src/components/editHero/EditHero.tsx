import { useNavigate } from "react-router-dom";
import { Hero } from "../../interfaces/Hero";
import styles from "./EditHero.module.css";

interface EditHeroProps {
  hero: Hero;
}

const EditHero: React.FC<EditHeroProps> = ({ hero }) => {
  const navigate = useNavigate();

  function handleSave() {}
  function handleCancel() {
    navigate(`/hero/${hero.id}`, { replace: true });
  }

  return (
    <div>
      <h2>Edit Hero</h2>
      <div></div>
      <div className={styles["action-buttons"]}>
        <button className={styles["save-button"]} onClick={handleSave}>
          Save
        </button>
        <button className={styles["cancel-button"]} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditHero;
