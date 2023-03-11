import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Components
import CarouselAll from "../components/Carousel/CarouselAll";
// Slices
import { setActivePage } from "../store/slices/navBarSlice";
// Styles
import styles from "./DashboardPage.module.scss";


function DashboardPage() {
  // UTILS
  const dispatch = useDispatch();

  // USEEFFECT
  useEffect(() => {
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