import React from 'react';
import { ButtonBase } from "@mui/material"

export const Button = (props) => {
    return (
    <ButtonBase variant="text">{props.text}</ButtonBase>
    )
}