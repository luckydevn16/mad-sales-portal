import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import App from "./App";
import { store } from "./store";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "./utils/global";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SnackbarProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
