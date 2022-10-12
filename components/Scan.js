import { faBarcode, faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tagSetIdQueryParam } from "consts";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  ListGroup,
  Modal,
  OverlayTrigger,
  Toast,
  ToastContainer,
  Tooltip,
} from "react-bootstrap";
import Barcode from "react-jsbarcode";
import { generateRandomTag } from "utils/tags.ts";
import { v4 as uuidv4 } from "uuid";
import ScanModal from "./ScanModal";
import Scanner from "./Scanner";
import ScanUrl from "./ScanUrl";

const metrcTagRegex = /^[A-F0-9]{24}$/;

export default function Scan(props) {
  let addTagsBuffer = [];
  let removeTagsBuffer = [];

  const [showModal, setShowModal] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastClassName, setToastClassName] = useState("");
  const [lastTouched, setLastTouched] = useState("");
  const [randomTag, setRandomTag] = useState(generateRandomTag());
  const [toastDuration, setToastDuration] = useState(1500);
  const [tagSet, setTagSet] = useState([]);
  const [refreshInflight, setRefreshInflight] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const handleCloseToast = () => setShowToast(false);
  const handleShowToast = () => setShowToast(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  let spinner = <></>;
  // if (refreshInflight) {
  //   spinner = (
  //     <div className="flex flex-row gap-2 justify-center items-center">
  //       <Spinner animation="border" size="sm" variant="dark"></Spinner>
  //       <div>Updating...</div>
  //     </div>
  //   );
  // }

  const openToast = (text, className = "", duration = 1500) => {
    setToastText(text);
    setToastClassName(className);
    setToastDuration(duration);
    setShowToast(true);
  };

  const onBarcodeDetect = (barcode) => {
    if (barcode.match(metrcTagRegex)) {
      openToast(`Added ${barcode}`);
      addTagsBuffer.push(barcode);
      flushBarcodeBuffer();
    } else {
      openToast(`${barcode} isn't a valid Metrc tag`);
    }
  };

  const onRemoveBarcode = (barcode) => {
    openToast(`Removed ${barcode}`);
    removeTagsBuffer.push(barcode);
    flushBarcodeBuffer();
  };

  const onDownloadCsv = () => {
    const csvContent = `data:text/csv;charset=utf-8,${tagSet.join("\r\n")}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${props.activeTagSetId}_${new Date().toISOString()}.csv`
    );
    document.body.appendChild(link); // Required for FF

    link.click();
  };

  const onOpenTestBarcode = () => {
    setRandomTag(generateRandomTag());
    handleShowModal();
  };

  const flushBarcodeBuffer = _.debounce(async () => {
    if (addTagsBuffer.length === 0 && removeTagsBuffer === 0) {
      return;
    }

    await updateTagSet({
      addTags: addTagsBuffer,
      removeTags: removeTagsBuffer,
    });
    addTagsBuffer = [];
    removeTagsBuffer = [];
  }, 250);

  const updateTagSet = async ({ addTags, removeTags } = {}) => {
    const url = new URL(
      `${window.location.origin}/.netlify/functions/updateSet`
    );

    url.searchParams.set("nonce", uuidv4());
    url.searchParams.set(tagSetIdQueryParam, props.activeTagSetId);
    if (addTags && addTags.length > 0) {
      url.searchParams.set("addTags", addTags.join(","));
    }
    if (removeTags && removeTags.length > 0) {
      url.searchParams.set("removeTags", removeTags.join(","));
    }
    await fetch(url.href).then((r) => r.json());

    refreshTagSet("update");
  };

  const refreshTagSet = _.debounce(async (reason = "") => {
    const url = new URL(
      `${window.location.origin}/.netlify/functions/fetchIfStale`
    );

    url.searchParams.set("nonce", uuidv4());
    url.searchParams.set(tagSetIdQueryParam, props.activeTagSetId);
    url.searchParams.set("timestamp", lastTouched || Date.now().toString());

    try {
      setRefreshInflight(true);
      const response = await fetch(url.href).then((r) => r.json());

      setLastTouched(response.lastTouched);

      if (response.tagSet) {
        setTagSet(response.tagSet.sort());
      }
    } finally {
      setRefreshInflight(false);
    }
  }, 250);

  useEffect(() => {
    refreshTagSet("props changed");
  }, [props.activeTagSetId]);

  useEffect(() => {
    const interval = setInterval(() => refreshTagSet("periodic"), 15000);
    // TODO show a notification page is not refreshing
    setTimeout(() => clearInterval(interval), 1000 * 60 * 30);
  }, []);

  return (
    <>
      <ToastContainer position="bottom-center">
        <Toast
          onClose={handleCloseToast}
          position="bottom-center"
          show={showToast}
          delay={1500}
          autohide
          className="ttt-purple-background text-white"
        >
          <Toast.Body className="text-center font-mono">{toastText}</Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 p-8 sm:p-16">
        <div className="sm:col-span-2 flex flex-row justify-center items-center gap-4 ttt-purple-text opacity-90">
          <FontAwesomeIcon className="text-3xl" icon={faBarcode} />
          <div className="text-2xl">Metrc Tag Scanner</div>
        </div>

        <div className="sm:col-span-2 flex flex-col items-center">
          <ScanModal></ScanModal>
        </div>

        <div className="sm:col-span-2 flex flex-row gap-8">
          <ScanUrl
            openToast={openToast}
            activeTagSetId={props.activeTagSetId}
          ></ScanUrl>
        </div>

        <div>
          <Scanner onBarcodeDetect={onBarcodeDetect}></Scanner>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-row gap-8 justify-between items-center">
            <div className="text-xl font-semibold ttt-purple-text opacity-80">
              {tagSet.length} tags
            </div>

            <ButtonGroup>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip variant="primary">Download tag set CSV</Tooltip>
                }
              >
                <Button
                  disabled={tagSet.length === 0}
                  onClick={() => onDownloadCsv()}
                  variant="outline-primary"
                >
                  <FontAwesomeIcon icon={faFileCsv} />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip variant="primary">Show a test barcode</Tooltip>
                }
              >
                <Button
                  onClick={() => onOpenTestBarcode()}
                  variant="outline-primary"
                >
                  <FontAwesomeIcon icon={faBarcode} />
                </Button>
              </OverlayTrigger>
            </ButtonGroup>
          </div>
          <ListGroup style={{ maxHeight: "80vh" }} className="overflow-y-auto">
            {tagSet.map((tag) => (
              <ListGroup.Item key={tag}>
                <div className="flex flex-row justify-between items-center">
                  <div>{tag}</div>
                  <Button
                    onClick={() => onRemoveBarcode(tag)}
                    size="sm"
                    variant="outline-danger"
                    style={{ border: "none" }}
                  >
                    &#10005;
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {spinner}
        </div>

        {/* <div className="sm:col-span-2">
          <div>{lastTouched}</div>
          <div>{props.activeTagSetId}</div>
          <Button variant="primary" onClick={handleShowToast}>
            Launch toast
          </Button>
        </div> */}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body className="flex flex-col items-center gap-8">
          <Barcode
            value={randomTag}
            options={{ format: "code128" }}
            renderer="svg"
            className="w-full"
          />
          <div className="text-center text-lg">
            Use this barcode to test your scanner
          </div>
          <Button
            variant="outline-primary"
            onClick={() => setRandomTag(generateRandomTag())}
          >
            New Tag
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
