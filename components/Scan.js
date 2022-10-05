import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const uuidRegex =
  /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/;
const metrcTagRegex = /[A-Z0-9]{24}/;

const SCAN_USER_ID = "SCAN_USER_ID";

export default function Scan({ className }) {
  const videoEl = useRef(null);
  const [isBrowserSupported, setIsBrowserSupported] = useState(true);
  const [activeTagSetId, setActiveTagSetId] = useState(null);
  const [tagSet, setTagSet] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  const handleChange = async (event) => {
    setCurrentTag(event.target.value);

    console.log("value is:", event.target.value);
  };

  const handleClick = async (event) => {
    event.preventDefault();

    // 👇️ value of input field
    console.log("handleClick 👉️", currentTag);

    if (currentTag) {
      addTags([currentTag]);

      setCurrentTag("");
    }
  };

  const refreshSetData = async () => {
    const tagSetUrl = new URL(
      `${window.location.origin}/.netlify/functions/updateSet`
    );

    tagSetUrl.searchParams.set("nonce", uuidv4());
    tagSetUrl.searchParams.set("tagSetId", activeTagSetId);

    const { tagSet } = await fetch(tagSetUrl.href).then((r) => r.json());

    setTagSet(tagSet.sort());
  };

  const addTags = async (newTags) => {
    const url = new URL(
      `${window.location.origin}/.netlify/functions/updateSet`
    );

    url.searchParams.set("nonce", uuidv4());
    url.searchParams.set("tagSetId", activeTagSetId);
    url.searchParams.set("addTags", newTags.join(","));

    const { tagSet } = await fetch(url.href).then((r) => r.json());

    setTagSet(tagSet.sort());
  };

  useEffect(() => {
    (async () => {
      if (!activeTagSetId) {
        return;
      }

      const url = new URL(window.location.href);
      url.searchParams.set("tagSetId", activeTagSetId);
      window.history.pushState({}, null, url.href);

      refreshSetData();
    })();
  }, [activeTagSetId]);

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
      const barcodes = await barcodeDetector.detect(video);

      if (barcodes.length <= 0) {
        return;
      }

      alert(barcodes.map((barcode) => barcode.rawValue));
    }, 200);
  };

  // useEffect(() => {
  //   (async () => {
  //     if (!userId) {
  //       return;
  //     }

  //     const url = new URL(
  //       `${window.location.origin}/.netlify/functions/getSets`
  //     );

  //     url.searchParams.set("nonce", uuidv4());
  //     url.searchParams.set("userId", userId);

  //     const { tagSetIds } = await fetch(url.href).then((r) => r.json());
  //     setTagSetIds(tagSetIds);
  //   })();
  // }, [userId]);

  useEffect(() => {
    // Initialization
    (async () => {
      const urlTagSetId = new URLSearchParams(window.location.search).get(
        "tagSetId"
      );
      if (urlTagSetId && urlTagSetId.match(uuidRegex)) {
        setActiveTagSetId(urlTagSetId);
      } else {
        setActiveTagSetId(uuidv4());
      }

      initializeScanner();
    })();
  }, []);

  return (
    <>
      <input
        type="text"
        onChange={handleChange}
        value={currentTag}
        autoComplete="off"
      />
      <h2>Current Tag: {currentTag}</h2>
      <button onClick={handleClick}>Click</button>
      <div>Browser supported: {isBrowserSupported.toString()}</div>
      <div>Active tag set id: {activeTagSetId}</div>
      <div>Active tag set: {JSON.stringify(tagSet)}</div>

      <video ref={videoEl} />
    </>
  );
}
