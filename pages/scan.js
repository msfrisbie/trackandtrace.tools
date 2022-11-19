import Header from "@components/Header";
import ScanGantry from "@components/ScanGantry";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store.ts";

export default function TagScanner() {
  return (
    <>
      <Header
        title="Metrc Tag Scanner | Track &amp; Trace Tools"
        url="https://www.trackandtrace.tools/scan"
        description="Scan Metrc tags with your phone or a bluetooth scanner, and download the list as a CSV"
      ></Header>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ScanGantry></ScanGantry>
        </PersistGate>
      </Provider>
    </>
  );
}
