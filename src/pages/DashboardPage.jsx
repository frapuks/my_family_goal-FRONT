import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./DashboardPage.module.scss";

// Import de nos components
import CarouselAll from "../components/Carousel/CarouselAll";

//Import des reducers du store
import { setActivePage } from "../store/slices/navBarSlice";
import { setSelectFamily } from "../store/slices/familiesSlice";

function DashboardPage() {
    const dispatch = useDispatch();
    // init selectFamily if null
    const selectFamily = useSelector(state => state.families.selectFamily);
    const familyIndex = useSelector(state => state.families.listFamilies[0]);
    if (!selectFamily) setSelectFamily(familyIndex);

    // [dispatch] servira à modifier le state uniquement au changement de valeur, et non a chaque nouveau rendu d'une même page par exemple

    React.useEffect(() => {
        dispatch(setActivePage("dashBoardPage"));
    }, []);

    return (
        <div className={styles.containerDashboard}>
            <CarouselAll  />
        </div>
    );
}

export default DashboardPage;
