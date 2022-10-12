import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

export default function Scanner({ className, onBarcodeDetect }) {
  const [isBrowserSupported, setIsBrowserSupported] = useState(false);

  const videoEl = useRef(null);
  const [stream, setStream] = useState(null);

  let buffer = "";
  const flushBuffer = _.debounce(() => {
    onBarcodeDetect(buffer);
    buffer = "";
  }, 100);

  const handleKeydown = (e) => {
    if (!e.key.match(/^[a-fA-F0-9]$/)) {
      return;
    }

    buffer += e.key;
    flushBuffer();
  };

  useEffect(() => {
    if (!isBrowserSupported) {
      return;
    }

    initializeScanner();
  }, [isBrowserSupported]);

  const initializeScanner = async () => {
    const barcodeDetector = new BarcodeDetector({
      formats: ["qr_code", "code_128"],
    });

    window.setInterval(async () => {
      let barcodes = [];
      try {
        barcodes = await barcodeDetector.detect(videoEl.current);
      } catch (e) {
        // console.error({ e });
      }

      if (barcodes.length <= 0) {
        return;
      }

      // console.log({ barcodes });

      barcodes.map((barcode) => onBarcodeDetect(barcode.rawValue));
    }, 500);
  };

  const toggleStream = async () => {
    if (stream) {
      stream.getTracks().forEach(function (track) {
        if (track.readyState == "live" && track.kind === "video") {
          track.stop();
        }
      });

      setStream(null);
    } else {
      const _stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment",
          },
        },
        audio: false,
      });

      videoEl.current.srcObject = _stream;
      videoEl.current.play();

      setStream(_stream);
    }
  };

  useEffect(() => {
    setIsBrowserSupported(typeof BarcodeDetector !== "undefined");

    document.body.addEventListener("keydown", handleKeydown);

    return () => {
      // teardown
      document.body.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  let scannerControl = <></>;
  if (isBrowserSupported) {
    if (stream) {
      scannerControl = (
        <Button variant="primary" onClick={() => toggleStream()}>
          CLOSE SCANNER
        </Button>
      );
    } else {
      scannerControl = (
        <>
          <Button variant="primary" onClick={() => toggleStream()}>
            OPEN SCANNER
          </Button>
          <div>
            Pair your bluetooth scanner and start scanning, or click OPEN
            SCANNER to scan with your browser.
          </div>
        </>
      );
    }
  } else {
    scannerControl = (
      <>
        <div>Pair your bluetooth scanner and start scanning.</div>
        <div className="text-sm text-gray-500">
          or switch to Google Chrome to scan with this device.
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center gap-8 text-center">
        <video
          className="object-cover w-full aspect-[2/3]"
          style={{ display: !!stream ? "block" : "none" }}
          ref={videoEl}
        />

        {scannerControl}
      </div>

      {/* <div>Browser supported: {isBrowserSupported.toString()}</div> */}
      {/* <Button variant="primary" onClick={() => onBarcodeDetect(generateRandomTag())}>
        FAKE SCAN
      </Button> */}
    </>
  );
}
