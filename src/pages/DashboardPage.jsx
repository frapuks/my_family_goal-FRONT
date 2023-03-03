import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import de nos components
import CarouselAll from "../components/Carousel/CarouselAll";

//Import des reducers du store
import { setActivePage } from "../store/slices/navBarSlice";

function DashboardPage() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    // [dispatch] servira à modifier le state uniquement au changement de valeur, et non a chaque nouveau rendu d'une même page par exemple

    React.useEffect(() => {
        dispatch(setActivePage("dashBoardPage"));
    }, []);

    return (
        <>
            <button onClick={() => navigate("/namefamily")}>Créer</button>
            <CarouselAll />
        </>
    );
}

export default DashboardPage;
