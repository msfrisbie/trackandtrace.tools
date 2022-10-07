import _ from "lodash";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  ListGroup,
  Modal,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import Scanner from "./Scanner";

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const metrcTagRegex = /^[A-F0-9]{24}$/;

const TAG_SET_ID = "TAG_SET_ID";

export default function Scan({ className }) {
  let addTagsBuffer = [];
  let removeTagsBuffer = [];

  const [activeTagSetId, setActiveTagSetId] = useState(null);
  const [tagSetUrl, setTagSetUrl] = useState("");
  const [toastText, setToastText] = useState("");
  const [tagSet, setTagSet] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseToast = () => setShowToast(false);
  const handleShowToast = () => setShowToast(true);

  // TODO buffer
  const onBarcodeDetect = (barcode) => {
    if (barcode.match(metrcTagRegex)) {
      setToastText(`Added ${barcode}`);
      setShowToast(true);
      addTagsBuffer.push(barcode);
      flushBarcodeBuffer();
    }
  };

  const onRemoveBarcode = (barcode) => {
    setToastText(`Removed ${barcode}`);
    setShowToast(true);
    removeTagsBuffer.push(barcode);
    flushBarcodeBuffer();
  };

  const flushBarcodeBuffer = _.debounce(async () => {
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
    url.searchParams.set("tagSetId", activeTagSetId);
    if (addTags && addTags.length > 0) {
      url.searchParams.set("addTags", addTags.join(","));
    }
    if (removeTags && removeTags.length > 0) {
      url.searchParams.set("removeTags", removeTags.join(","));
    }
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

      updateTagSet();

      setTagSetUrl(`${window.location.origin}/scan?tagSetId=${activeTagSetId}`);
    })();
  }, [activeTagSetId]);

  useEffect(() => {
    // Initialization
    (async () => {
      const urlTagSetId = new URLSearchParams(window.location.search).get(
        "tagSetId"
      );

      const localStorageTagSetId = localStorage.getItem(TAG_SET_ID);

      let tagSetId = uuidv4();

      if (urlTagSetId && urlTagSetId.match(uuidRegex)) {
        tagSetId = urlTagSetId;
      } else if (
        localStorageTagSetId &&
        localStorageTagSetId.match(uuidRegex)
      ) {
        tagSetId = localStorageTagSetId;
      }

      setActiveTagSetId(tagSetId);
      localStorage.setItem(TAG_SET_ID, tagSetId);
    })();
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShowModal}>
        Launch modal
      </Button>
      <Button variant="primary" onClick={handleShowToast}>
        Launch toast
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="bottom-center">
        <Toast
          onClose={handleCloseToast}
          position="bottom-center"
          show={showToast}
          delay={1500}
          autohide
          className="ttt-purple-background  text-white"
        >
          <Toast.Body className="text-center font-mono">{toastText}</Toast.Body>
          {/* <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body> */}
        </Toast>
      </ToastContainer>

      <Form>
        <Form.Group>
          <InputGroup>
            <Form.Control readOnly value={tagSetUrl} />
            <Button variant="outline-primary">COPY URL</Button>
          </InputGroup>
          <Form.Label>Save and share this URL</Form.Label>
        </Form.Group>
      </Form>

      <Scanner onBarcodeDetect={onBarcodeDetect}></Scanner>

      <div>Total tags: {tagSet.length}</div>

      <div style={{ maxHeight: "100vh" }} className="overflow-y-auto">
        <ListGroup>
          {tagSet.map((tag) => (
            <ListGroup.Item key={tag}>
              <div className="flex flex-row justify-between items-center">
                <div>{tag}</div>
                <Button
                  onClick={() => onRemoveBarcode(tag)}
                  size="sm"
                  variant="outline-danger"
                >
                  &#10005;
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
}
