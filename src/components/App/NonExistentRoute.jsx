import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NonExistentRoute() {
    const navigate = useNavigate();

    useEffect(() => navigate("/"), []);
}
