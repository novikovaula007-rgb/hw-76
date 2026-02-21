import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ToastContainer} from "react-toastify";
import {CssBaseline} from "@mui/material";
import {Provider} from "react-redux";
import {store} from "../app/store/store.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CssBaseline/>
        <Provider store={store}>
            <App/>
        </Provider>
        <ToastContainer/>
    </StrictMode>,
)
