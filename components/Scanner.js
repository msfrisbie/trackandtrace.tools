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
  const [isBrowserSupported, setIsBrowserSupported] = useState(false);
  const [isBrowserSupportEvaluated, setIsBrowserSupportEvaluated] =
    useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const videoEl = useRef(null);

  const initializeScanner = async () => {
    if (typeof BarcodeDetector === "undefined") {
      setIsBrowserSupported(false);
      setIsBrowserSupportEvaluated(true);
      return;
    }
    setIsBrowserSupported(true);
    setIsBrowserSupportEvaluated(true);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: {
          ideal: "environment",
        },
      },
      audio: false,
    });

    videoEl.current.srcObject = stream;

    const barcodeDetector = new BarcodeDetector({
      formats: ["qr_code", "code_128"],
    });

    setIsScannerOpen(true);

    window.setInterval(async () => {
      let barcodes = [];
      try {
        barcodes = await barcodeDetector.detect(videoEl.current);
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
      if (isScannerOpen) {
        videoEl.current?.play();
      } else {
        videoEl.current?.pause();
      }
    })();
  }, [isScannerOpen]);

  useEffect(() => {
    // Initialization
    (async () => {
      initializeScanner();
    })();
  }, []);

  let video;

  return (
    <>
      <div>Browser supported: {isBrowserSupported.toString()}</div>
      <video
        style={{ display: isScannerOpen ? "block" : "none" }}
        ref={videoEl}
      />
      <Button variant="primary" onClick={() => onBarcodeDetect(randomTag())}>
        FAKE SCAN
      </Button>
      <Button
        variant="primary"
        onClick={() => setIsScannerOpen(!isScannerOpen)}
      >
        TOGGLE SCANNER
      </Button>
    </>
  );
}
