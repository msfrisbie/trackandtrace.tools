import Header from "@components/Header";
import Barcode from "react-jsbarcode";
import { generateRandomTag } from "utils/tags.ts";

export default function Faq() {
  return (
    <>
      <Header
        title="FAQ | Track &amp; Trace Tools"
        url="https://www.trackandtrace.tools/faq"
        description="Find answers to commonly asked questions about Track &amp; Trace Tools."
      ></Header>
      <div className="flex flex-col items-center p-12">
        <Barcode
          value={generateRandomTag()}
          options={{ format: "code128" }}
          renderer="svg"
          className="w-full"
        />
      </div>
    </>
  );
}
