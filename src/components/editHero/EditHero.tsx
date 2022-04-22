import { Hero } from "../../interfaces/Hero";
import styles from "./EditHero.module.css";

interface EditHeroProps {
  hero: Hero;
}

const EditHero: React.FC<EditHeroProps> = ({ hero }) => {
  function handleSave() {}
  function handleCancel() {}

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
