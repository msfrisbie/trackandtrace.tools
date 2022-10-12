import Header from "@components/Header";
import ScanGantry from "@components/ScanGantry";

export default function TagScanner() {
  return (
    <>
      <Header
        title="Metrc Tag Scanner | Track &amp; Trace Tools"
        url="https://www.trackandtrace.tools/scan"
        description="Scan Metrc tags with your phone or a bluetooth scanner, and download the list as a CSV"
      ></Header>

      <ScanGantry></ScanGantry>
    </>
  );
}
