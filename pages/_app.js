import Boilerplate from "@components/Boilerplate";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@styles/globals.scss";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store.ts";

config.autoAddCss = false;

function Application({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Boilerplate>
          <Component {...pageProps} />
        </Boilerplate>
      </PersistGate>
    </Provider>
  );
}

export default Application;
