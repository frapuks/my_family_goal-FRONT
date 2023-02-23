import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Card from "../Card/Card";

const membreData=
[
    {
        "id": 1,
        "name": "Moaï"
    },
    {
        "id": 2,
        "name": "Front"
    },
    {
        "id": 3,
        "name": "Back"
    }
]




function CarouselMembre() {

    return (
            <Carousel>
                {
                membreData.map( (data) => <Card key={data.id} {...data}/> )
                }
            </Carousel>
    )
    
}


export default CarouselMembre;