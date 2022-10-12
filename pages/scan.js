import Header from "@components/Header";
import ScanGantry from "@components/ScanGantry";

export default function TagScanner() {
  return (
    <>
      <Header
        title="Tag Scanner | Track &amp; Trace Tools"
        url="https://www.trackandtrace.tools/scan"
        description="Scan Metrc tags in your browser."
      ></Header>

      <ScanGantry></ScanGantry>
    </>
  );
}
