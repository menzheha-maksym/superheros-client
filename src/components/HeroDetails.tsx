import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Hero } from "../interfaces/Hero";
// import styles from "./HeroDetails.module.css";

interface HeroDetailsProps {}

const HeroDetails: React.FC<HeroDetailsProps> = ({}) => {
  // console.log(hero);

  const params = useParams();

  const [hero, setHero] = useState<Hero>();

  console.log(params);

  useEffect(() => {}, []);

  return (
    <>
      <div>hero</div>
    </>
  );
};

export default HeroDetails;
