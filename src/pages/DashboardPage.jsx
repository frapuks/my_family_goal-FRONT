import React from "react";
import { useDispatch } from 'react-redux';

// Import de nos components
import CarouselAll from "../components/Carousel/CarouselAll";

//Import des reducers du store
import { setActivePage } from '../store/slices/navBarSlice';

function DashboardPage() {
  const dispatch = useDispatch();

    // [dispatch] servira à modifier le state uniquement au changement de valeur, et non a chaque nouveau rendu d'une même page par exemple

  React.useEffect(() => {
    dispatch(setActivePage('dashBoardPage'));
  }, [dispatch]);  
  
  return (
    <>
      <CarouselAll />
    </>
  );
}

export default DashboardPage;
