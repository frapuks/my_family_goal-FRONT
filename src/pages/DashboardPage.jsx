import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Components
import { CarouselAll } from "../components";
// Slices
import { setActivePage } from "../store/slices/navBarSlice";
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