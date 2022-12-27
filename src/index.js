import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./store/index";

import "@ionic/react/css/core.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
