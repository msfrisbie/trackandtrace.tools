import { tagSetIdQueryParam } from "consts";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Scan from "./Scan";

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export default function ScanGantry() {
  const [tagSetId, setTagSetId] = useState(null);

  useEffect(() => {
    (async () => {
      const urlTagSetId = new URLSearchParams(window.location.search).get(
        tagSetIdQueryParam
      );

      if (urlTagSetId && urlTagSetId.match(uuidRegex)) {
        setTagSetId(urlTagSetId);
      } else {
        const newTagSetId = uuidv4();
        const url = new URL(window.location.href);
        url.searchParams.set(tagSetIdQueryParam, newTagSetId);
        window.history.pushState(null, null, url.href);
        setTagSetId(newTagSetId);
      }
    })();
  }, []);

  if (tagSetId) {
    return <Scan activeTagSetId={tagSetId}></Scan>;
  } else {
    return <></>;
  }
}
