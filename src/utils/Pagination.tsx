import { useEffect, useState } from "react";

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
  const [disablePrevButton, setDisablePrevButton] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(false);

  function previousButtonClick() {
    updateSkip(skip - itemsPerPage);
  }

  function nextButtonClick() {
    updateSkip(skip + itemsPerPage);
  }

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
      <button disabled={disablePrevButton} onClick={previousButtonClick}>
        previous
      </button>
      <button disabled={disableNextButton} onClick={nextButtonClick}>
        next
      </button>
    </>
  );
};

export default Pagination;
