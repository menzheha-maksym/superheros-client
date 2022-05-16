import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeroPreview from "../../components/heroPreview/HeroPreview";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchHerosWithPaginationAsync,
  selectAllHerosCount,
  selectHeros,
} from "../../redux/reducers/herosSlice";
import {
  selectActivePage,
  selectSkip,
  setPage,
} from "../../redux/reducers/paginationSlice";
import Pagination from "../../utils/Pagination/Pagination";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const limit = 5;

  const navigate = useNavigate();
  const location = useLocation();
  const mounted = useRef(false);

  const activePage = useAppSelector(selectActivePage);
  const skip = useAppSelector(selectSkip);
  const heros = useAppSelector(selectHeros);
  const allHerosCount = useAppSelector(selectAllHerosCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHerosWithPaginationAsync({ limit, skip }));
  }, [dispatch, skip]);

  useEffect(() => {
    const currentPage = location.pathname.split("/")[1];
    // componentDidUpdate
    if (mounted.current && activePage !== Number(currentPage)) {
      navigate("/" + activePage);
    }
    // componentDidMount
    else if (!mounted.current) {
      if (currentPage && activePage !== Number(currentPage)) {
        dispatch(setPage(Number(currentPage)));
      }
    }
    mounted.current = true;
  }, [activePage, dispatch, location.pathname, navigate]);

  return (
    <div>
      <h1>Superheros</h1>
      <div>
        <button
          className={styles["add-hero-button"]}
          onClick={() => {
            navigate("/add-hero");
          }}
        >
          ADD A HERO
        </button>
      </div>
      {heros ? (
        <div>
          <div className={styles["heros-container"]}>
            {heros.map((hero, i) => {
              return (
                <HeroPreview
                  key={hero.id}
                  id={hero.id}
                  nickname={hero.nickname}
                />
              );
            })}
          </div>
          <Pagination itemsCount={allHerosCount} itemsPerPage={limit} />
        </div>
      ) : null}
    </div>
  );
}
