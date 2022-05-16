import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  nextPage,
  prevPage,
  selectActivePage,
  selectPages,
  setPage,
  addPages,
  disablePrevButton,
  enablePrevButton,
  disableNextButton,
  enableNextButton,
  selectNextButton,
  selectPrevButton,
  selectSkip,
  setSkip,
} from "../../redux/reducers/paginationSlice";
import styles from "./Pagination.module.css";

interface PaginationProps {
  itemsCount: number;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsCount,
  itemsPerPage,
}) => {
  const dispatch = useAppDispatch();

  const activePage = useAppSelector(selectActivePage);
  const pages = useAppSelector(selectPages);
  const nextButton = useAppSelector(selectNextButton);
  const prevButton = useAppSelector(selectPrevButton);
  const skip = useAppSelector(selectSkip);

  const mounted = useRef(false);

  function previousButtonClick() {
    dispatch(prevPage());
  }

  function nextButtonClick() {
    dispatch(nextPage());
  }

  useEffect(() => {
    dispatch(addPages({ itemsCount, itemsPerPage }));
  }, [dispatch, itemsCount, itemsPerPage]);

  useEffect(() => {
    // works like componentDidUpdate()
    if (mounted.current) {
      dispatch(setSkip(activePage * itemsPerPage - itemsPerPage));
    }
    mounted.current = true;
  }, [activePage, dispatch, itemsPerPage]);

  useEffect(() => {
    if (skip - itemsPerPage < 0) {
      if (prevButton) dispatch(disablePrevButton());
    } else {
      if (!prevButton) dispatch(enablePrevButton());
    }

    if (skip + itemsPerPage >= itemsCount) {
      if (nextButton) dispatch(disableNextButton());
    } else {
      if (!nextButton) dispatch(enableNextButton());
    }
  }, [dispatch, itemsCount, itemsPerPage, nextButton, prevButton, skip]);

  return (
    <>
      <div className={styles["container"]}>
        <button disabled={!prevButton} onClick={previousButtonClick}>
          previous
        </button>
        <div className={styles["number-buttons-container"]}>
          {pages
            ? pages.map((button, i) => {
                if (button === activePage) {
                  return (
                    <button className={styles["active-button"]} key={i}>
                      {button}
                    </button>
                  );
                } else {
                  return (
                    <button key={i} onClick={() => dispatch(setPage(i + 1))}>
                      {button}
                    </button>
                  );
                }
              })
            : null}
        </div>
        <button disabled={!nextButton} onClick={nextButtonClick}>
          next
        </button>
      </div>
    </>
  );
};

export default Pagination;
