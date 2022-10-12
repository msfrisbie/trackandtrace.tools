import { faLink, faPlus, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tagSetIdQueryParam } from "consts";
import { QRCodeSVG } from "qrcode.react";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Modal,
  Overlay,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

export default function ScanUrl(props) {
  const [showModal, setShowModal] = useState(false);

  const [showLinkTooltip, setShowLinkTooltip] = useState(false);

  const tooltipTarget = useRef(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const onCopyUrl = () => {
    navigator.clipboard.writeText(tagSetUrl());
    props.openToast(`Copied URL`);
  };

  const onNewSet = () => {
    window.open("/scan", "_blank");
  };

  const tagSetUrl = () => {
    return `${window.location.origin}/scan?${tagSetIdQueryParam}=${props.activeTagSetId}`;
  };

  useEffect(() => {
    // Initialization
    setShowLinkTooltip(true);
    setTimeout(() => setShowLinkTooltip(false), 5000);
  }, []);

  return (
    <>
      <Form className="w-full max-w-lg">
        <Form.Group>
          <InputGroup>
            <Form.Control ref={tooltipTarget} readOnly value={tagSetUrl()} />

            <Overlay
              target={tooltipTarget.current}
              show={showLinkTooltip}
              placement="bottom"
            >
              {(props) => (
                <Tooltip variant="primary" {...props}>
                  Save this link! If you lose the link, your tag set cannot be
                  recovered
                </Tooltip>
              )}
            </Overlay>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip variant="primary">Open QR code</Tooltip>}
            >
              <Button
                onClick={() => handleShowModal()}
                variant="outline-primary"
              >
                <FontAwesomeIcon icon={faQrcode} />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip variant="primary">Copy link to tag set</Tooltip>
              }
            >
              <Button onClick={() => onCopyUrl()} variant="outline-primary">
                <FontAwesomeIcon icon={faLink} />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip variant="primary">Create new tag set</Tooltip>}
            >
              <Button onClick={() => onNewSet()} variant="outline-primary">
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </OverlayTrigger>
          </InputGroup>
          {/* <Form.Label className="text-sm text-gray-500 pt-2 px-1">
          Anyone with this link can view and edit this tag set. Tag sets
          are deleted after 30 days of inactivity.
        </Form.Label> */}
        </Form.Group>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>
          <div className="flex flex-col items-center p-6">
            <QRCodeSVG value={tagSetUrl()} />
          </div>
          <div className="text-center">
            Scan this QR code with your phone to use it as a barcode scanner
          </div>
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
