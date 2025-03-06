import React from "react";
import {useKeycloak} from "@react-keycloak/web";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute: React.FC = () => {

    const {keycloak, initialized} = useKeycloak();

    if (!initialized) {
        return <div>Chargement...</div>;
    }

    return keycloak.authenticated ? <Outlet/> : <Navigate to="/" replace/>;
}

export default PrivateRoute;