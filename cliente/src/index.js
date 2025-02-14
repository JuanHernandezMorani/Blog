import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import {store} from "./store";
import "./styles/index.css"
import App from './main/App';
import reportWebVitals from './main/reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</Provider>
);

reportWebVitals();