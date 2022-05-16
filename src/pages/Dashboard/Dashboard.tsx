import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchHerosWithPagiantion } from "../../api/heroAPI";
import HeroPreview from "../../components/heroPreview/HeroPreview";
import { Hero } from "../../interfaces/Hero";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
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
  const dispatch = useAppDispatch();

  const [heros, setHeros] = useState<Hero[]>();
  const [itemsCount, setItemsCount] = useState<number>(0);

  useEffect(() => {
    fetchHerosWithPagiantion(limit, skip).then((res) => {
      setHeros(res.data);
      setItemsCount(res.count);
    });
  }, [skip]);

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
          <Pagination itemsCount={itemsCount} itemsPerPage={limit} />
        </div>
      ) : null}
    </div>
  );
}
