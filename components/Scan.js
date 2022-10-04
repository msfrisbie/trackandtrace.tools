import React, { useEffect, useRef } from "react";

export default function Scan({ className }) {
  const videoEl = useRef(null);

  useEffect(() => {
    if (typeof BarcodeDetector === "undefined") {
      return;
    }

    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment",
          },
        },
        audio: false,
      });
      videoEl.current.srcObject = stream;
      await videoEl.current.play();

      const barcodeDetector = new BarcodeDetector({
        formats: ["qr_code", "code_128"],
      });
      window.setInterval(async () => {
        const barcodes = await barcodeDetector.detect(videoEl.current);
        if (barcodes.length <= 0) return;
        alert(barcodes.map((barcode) => barcode.rawValue));
      }, 1000);
    })();
  }, []);

  return <video ref={videoEl} style={{ width: "100vw", height: "100vh" }} />;
}
