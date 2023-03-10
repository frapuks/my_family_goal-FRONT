import React from "react";
import { useDispatch } from "react-redux";


import styles from "./DashboardPage.module.scss";

// Import de nos components
import CarouselAll from "../components/Carousel/CarouselAll";

//Import des reducers du store
import { setActivePage } from "../store/slices/navBarSlice";

function DashboardPage() {

  const dispatch = useDispatch();

  // [dispatch] servira à modifier le state uniquement au changement de valeur, et non a chaque nouveau rendu d'une même page par exemple

  React.useEffect(() => {
    dispatch(setActivePage("dashBoardPage"));
  }, []);

  return (
    <>
      <div className={styles.bg}></div>
      <div className={styles.bg}></div>
      <div className={styles.bg}></div>
      <div className={styles.bg2}></div>

      <div className={styles.containerDashboard}>
        <CarouselAll />
      </div>
    </>
  );

}

export default DashboardPage;
