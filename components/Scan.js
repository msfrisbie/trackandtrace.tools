import _ from "lodash";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Modal,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import Scanner from "./Scanner";

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const metrcTagRegex = /^[A-F0-9]{24}$/;

const SCAN_USER_ID = "SCAN_USER_ID";

export default function Scan({ className }) {
  let buffer = [];

  const [activeTagSetId, setActiveTagSetId] = useState(null);
  const [tagSetUrl, setTagSetUrl] = useState("");
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
      buffer.push(barcode);
      flushBarcodeBuffer();
    }
  };

  const flushBarcodeBuffer = _.debounce(async () => {
    await updateTagSet({ addTags: buffer });
    buffer = [];
  }, 250);

  const updateTagSet = async ({ addTags, removeTags } = {}) => {
    const url = new URL(
      `${window.location.origin}/.netlify/functions/updateSet`
    );

    url.searchParams.set("nonce", uuidv4());
    url.searchParams.set("tagSetId", activeTagSetId);
    if (addTags) {
      url.searchParams.set("addTags", addTags.join(","));
    }
    if (removeTags) {
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
      if (urlTagSetId && urlTagSetId.match(uuidRegex)) {
        setActiveTagSetId(urlTagSetId);
      } else {
        setActiveTagSetId(uuidv4());
      }
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
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
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
      {/* <input
        type="text"
        onChange={handleChange}
        value={currentTag}
        autoComplete="off"
      />
      <h2>Current Tag: {currentTag}</h2> */}
      {/* <button onClick={handleClick}>Click</button> */}
      <div>Active tag set id: {activeTagSetId}</div>
      <div>Active tag set: {JSON.stringify(tagSet)}</div>

      <Scanner onBarcodeDetect={onBarcodeDetect}></Scanner>
    </>
  );
}
