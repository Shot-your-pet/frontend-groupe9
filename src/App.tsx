import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { AnimatePresence } from 'framer-motion';
import { useKeycloak } from '@react-keycloak/web';
import LandingPage from './pages/LandingPage';
import Timeline from './pages/Timeline';
import Shooter from './pages/Shooter';
import Profile from './pages/Profile';
import Layout from './components/Layout';

function App() {
  // const { keycloak, initialized } = useKeycloak();
  const initialized = true
  const keycloakInit = true
  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
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
            <Route
              path="/"
              element={
                keycloakInit ? (
                  <Navigate to="/timeline" replace />
                ) : (
                  <LandingPage />
                )
              }
            />
            <Route
              element={
                keycloakInit ? (
                  <Layout />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            >
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/shooter" element={<Shooter />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Router>
    </ConfigProvider>
  );
}

export default App;