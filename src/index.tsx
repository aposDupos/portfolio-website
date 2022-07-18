import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/store';
import App from './App';
import './styles/main.scss'
import ReactDOM from "react-dom";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    rootElement
);