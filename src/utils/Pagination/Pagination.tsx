import { useEffect, useState } from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  itemsCount: number;
  itemsPerPage: number;
  updateSkip: (skip: number) => void;
  skip: number;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsCount,
  itemsPerPage,
  updateSkip,
  skip,
}) => {
  const [buttons, setButtons] = useState<number[]>();
  const [activeButton, setActiveButton] = useState(1);

  const [disablePrevButton, setDisablePrevButton] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(false);

  function previousButtonClick() {
    updateSkip(skip - itemsPerPage);
    setActiveButton(activeButton - 1);
  }

  function nextButtonClick() {
    updateSkip(skip + itemsPerPage);
    setActiveButton(activeButton + 1);
  }

  useEffect(() => {
    const buttonsCount = Math.ceil(itemsCount / itemsPerPage);
    const buttonsArr = [];
    for (let i = 1; i < buttonsCount + 1; i++) {
      buttonsArr.push(i);
    }
    setButtons(buttonsArr);
  }, [itemsCount, itemsPerPage]);

  useEffect(() => {
    if (skip - itemsPerPage < 0) {
      setDisablePrevButton(true);
    } else {
      setDisablePrevButton(false);
    }

    if (skip + itemsPerPage >= itemsCount) {
      setDisableNextButton(true);
    } else {
      setDisableNextButton(false);
    }
  }, [itemsCount, itemsPerPage, skip]);

  return (
    <>
      <div className={styles["container"]}>
        <button disabled={disablePrevButton} onClick={previousButtonClick}>
          previous
        </button>
        <div className={styles["number-buttons-container"]}>
          {buttons
            ? buttons.map((button, i) => {
                if (button === activeButton) {
                  return (
                    <button className={styles["active-button"]} key={i}>
                      {button}
                    </button>
                  );
                } else {
                  return <button key={i}>{button}</button>;
                }
              })
            : null}
        </div>
        <button disabled={disableNextButton} onClick={nextButtonClick}>
          next
        </button>
      </div>
    </>
  );
};

export default Pagination;
