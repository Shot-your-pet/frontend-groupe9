import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ConfigProvider, theme} from 'antd';
import {AnimatePresence} from 'framer-motion';
import LandingPage from './pages/LandingPage';
import Timeline from './pages/Timeline';
import Shooter from './pages/Shooter';
import Profile from './pages/Profile';
import Layout from "./components/Layout.tsx";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./services/keycloak.ts";
import PrivateRoute from "./components/PrivateRoute.tsx";


function App(): unknown {

    return (
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={{
                onLoad: 'check-sso',
            }}
            // onEvent={(event, error) => console.log('Keycloak event:', event, error)}
        >
            <ConfigProvider
                theme={{
                    algorithm: theme.defaultAlgorithm,
                    token: {
                        colorPrimary: '#00b96b',
                        borderRadius: 8,
                    },
                }}
            >
                <Router>
                    <AnimatePresence mode="wait">
                        <Routes>
                            <Route path="/" element={<LandingPage/>}/>
                            <Route element={<PrivateRoute/>}>
                                <Route
                                    element={<Layout/>}
                                >
                                    <Route path="/timeline" element={<Timeline/>}/>
                                    <Route path="/shooter" element={<Shooter/>}/>
                                    <Route path="/profile" element={<Profile/>}/>
                                </Route>
                            </Route>
                        </Routes>
                    </AnimatePresence>
                </Router>
            </ConfigProvider>
        </ReactKeycloakProvider>
    );
}

export default App;