import React from "react";
import ReactDOM from "react-dom";

// redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducer from "./reducer";

import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./nav/Navigation";
import MainPage from "./MainPage";

const store = createStore(Reducer);

ReactDOM.render(
    <Provider store={store}>
        <Navigation />
        <MainPage />
    </Provider>
    ,
    document.querySelector("#root")
);