import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "./test.scss";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App.jsx";

// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
// registerServiceWorker();
