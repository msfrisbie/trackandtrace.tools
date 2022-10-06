import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

function randomTag() {
  var result = "";
  var characters = "ABCDEF0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 24; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function Scanner({ className, onBarcodeDetect }) {
  const [isBrowserSupported, setIsBrowserSupported] = useState(true);

  const videoEl = useRef(null);

  const initializeScanner = async () => {
    if (typeof BarcodeDetector === "undefined") {
      setIsBrowserSupported(false);
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: {
          ideal: "environment",
        },
      },
      audio: false,
    });

    const video = videoEl.current;

    video.srcObject = stream;
    await video.play();

    const barcodeDetector = new BarcodeDetector({
      formats: ["qr_code", "code_128"],
    });

    window.setInterval(async () => {
      let barcodes = [];
      try {
        barcodes = await barcodeDetector.detect(video);
      } catch (e) {
        console.error({ e });
      }

      if (barcodes.length <= 0) {
        return;
      }

      console.log({ barcodes });

      barcodes.map((barcode) => onBarcodeDetect(barcode.rawValue));
    }, 500);
  };

  useEffect(() => {
    // Initialization
    (async () => {
      initializeScanner();
    })();
  }, []);

  return (
    <>
      <div>Browser supported: {isBrowserSupported.toString()}</div>
      <video ref={videoEl} />
      <Button variant="primary" onClick={() => onBarcodeDetect(randomTag())}>
        FAKE SCAN
      </Button>
    </>
  );
}
