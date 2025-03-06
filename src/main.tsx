import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <ErrorBoundary>
        <App/>
    </ErrorBoundary>
    // </StrictMode>
);