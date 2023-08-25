import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Components
import CarouselAll from "../components/Carousel/CarouselAll";
// Slices
import { setActivePage } from "../store/slices/navBarSlice";
// Styles
import styles from "./DashboardPage.module.scss";
import { Container } from "@mui/material";


function DashboardPage() {
  // UTILS
  const dispatch = useDispatch();

  // USEEFFECT
  useEffect(() => {
    dispatch(setActivePage("dashBoardPage"));
  }, []);


  return (
      <Container>
        <CarouselAll />
      </Container>
  );

}

export default DashboardPage;