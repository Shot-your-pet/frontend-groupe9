import React from "react";
import {useKeycloak} from "@react-keycloak/web";
import {Navigate, Outlet} from "react-router-dom";
import "./Load.css"

const PrivateRoute: React.FC = () => {

    const {keycloak, initialized} = useKeycloak();

    if (!initialized) {
        return (
            <div className="container">
                <div className="dot dot-1"></div>
                <div className="dot dot-2"></div>
                <div className="dot dot-3"></div>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0  0 1 0 0 0
                      0 0 1 0 0  0 0 0 21 -7"
                            />
                        </filter>
                    </defs>
                </svg>
            </div>
        );
    }

    return keycloak.authenticated ? <Outlet/> : <Navigate to="/" replace/>;
}

export default PrivateRoute;