import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "../../interfaces/Hero";
import styles from "./EditHero.module.css";

interface EditHeroProps {
  hero: Hero;
}

const EditHero: React.FC<EditHeroProps> = ({ hero }) => {
  const navigate = useNavigate();

  const [updatedValues, setUpdatedValues] = useState<Partial<Hero>>();

  function handleSave() {
    if (updatedValues) {
      const valuesToUpdate = {};

      for (let [k, v] of Object.entries(updatedValues)) {
        if (v) {
          Object.assign(valuesToUpdate, Object.fromEntries([[k, v]]));
        }
      }

      console.log(valuesToUpdate);
    }
  }
  function handleCancel() {
    navigate(`/hero/${hero.id}`, { replace: true });
  }

  return (
    <div>
      <h2>Edit Hero</h2>
      <div className={styles["form-container"]}>
        <div className={styles["form-like"]}>
          <span>Nickname</span>
          <input
            type="text"
            name="nickname"
            value={
              updatedValues?.nickname ? updatedValues.nickname : hero.nickname
            }
            required={true}
            onChange={(e) =>
              setUpdatedValues({ ...updatedValues, nickname: e.target.value })
            }
          />

          <span>Real name</span>
          <input
            type="text"
            name="real_name"
            value={
              updatedValues?.real_name
                ? updatedValues.real_name
                : hero.real_name
            }
            required={true}
            onChange={(e) =>
              setUpdatedValues({ ...updatedValues, real_name: e.target.value })
            }
          />

          <span>Origin description</span>
          <textarea
            rows={4}
            name="origin_description"
            value={
              updatedValues?.origin_description
                ? updatedValues.origin_description
                : hero.origin_description
            }
            required={true}
            onChange={(e) =>
              setUpdatedValues({
                ...updatedValues,
                origin_description: e.target.value,
              })
            }
          />

          <span>Superpowers</span>
          <textarea
            rows={4}
            name="superpowers"
            value={
              updatedValues?.superpowers
                ? updatedValues.superpowers
                : hero.superpowers
            }
            required={true}
            onChange={(e) =>
              setUpdatedValues({
                ...updatedValues,
                superpowers: e.target.value,
              })
            }
          />

          <span>Catch Phrase</span>
          <textarea
            rows={2}
            name="catch_phrase"
            value={
              updatedValues?.catch_phrase
                ? updatedValues.catch_phrase
                : hero.catch_phrase
            }
            required={true}
            onChange={(e) =>
              setUpdatedValues({
                ...updatedValues,
                catch_phrase: e.target.value,
              })
            }
          />
        </div>
      </div>

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
