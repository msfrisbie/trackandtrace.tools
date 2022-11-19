import Boilerplate from "@components/Boilerplate";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@styles/globals.scss";

config.autoAddCss = false;

function Application({ Component, pageProps }) {
  return (
        <Boilerplate>
          <Component {...pageProps} />
        </Boilerplate>
  );
}

export default Application;
