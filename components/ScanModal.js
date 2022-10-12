import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function ScanModal() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShowModal}>
        {/* <FontAwesomeIcon icon={faQuestion} className="cursor-pointer" /> */}
        What is this?
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Metrc Tag Scanner</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex flex-col gap-4">
          <div>
            <div className="ttt-purple-text font-semibold opacity-80">
              What is this?
            </div>
            <div>A free tool for scanning Metrc tags.</div>
          </div>
          <div>
            <div className="ttt-purple-text font-semibold opacity-80">
              Features
            </div>
            <ul className="list-disc">
              <li>
                Scan Metrc tags with your phone, webcam, or low-cost barcode
                scanners
              </li>
              <li>Tag sets can be accessed with a shareable private URL</li>
              <li>Scan in tags from multiple devices</li>
              <li>Download your tag set as a CSV</li>
              <li>Tag sets are deleted after 30 days of inactivity</li>
            </ul>
          </div>
          <div>
            <div className="ttt-purple-text font-semibold opacity-80">
              How do I scan with my phone or webcam?
            </div>
            <div>
              Click OPEN SCANNER to start scanning. Only Google Chrome supports
              barcode scanning.
            </div>
          </div>
          <div>
            <div className="ttt-purple-text font-semibold opacity-80">
              Can multiple devices use one link?
            </div>
            <div>
              Yes. Any number of devices using a link will sync to the same tag
              set.
            </div>
          </div>
          <div>
            <div className="ttt-purple-text font-semibold opacity-80">
              How do I scan with a bluetooth scanner?
            </div>
            <div>
              If you have purchased a bluetooth barcode scanner, pair it with
              your computer or phone. When the scanner sends scanned Metrc tag
              barcodes to the paired device, this tool will automatically detect
              them.
            </div>
          </div>
          <div>
            <div className="ttt-purple-text font-semibold opacity-80">
              Which bluetooth barcode scanners are supported?
            </div>
            <div>
              <a
                href="https://www.amazon.com/NETUM-Bluetooth-Wireless-Handheld-NT-1228BC/dp/B07CBRTWS5"
                target="_blank"
              >
                This scanner
              </a>{" "}
              is recommended. All bluetooth scanners that pair as a keyboard
              should work.{" "}
            </div>
          </div>
          <div>
            <div className="ttt-purple-text font-semibold opacity-80">
              Does this tool sync with Metrc?
            </div>
            <div>
              No. This tool is only for scanning individual Metrc tags, it does
              not use Metrc.
            </div>
          </div>
          <div>
            <div className="ttt-purple-text font-semibold opacity-80">
              Are tags that I scan private?
            </div>
            <div>
              Only people with the unique link can see the list. Tag lists are
              stored in a private Redis instance. Tag lists are deleted after 30
              days of inactivity.
            </div>
          </div>
          <div>
            <div className="ttt-purple-text font-semibold opacity-80">
              Why should I trust this tool?
            </div>
            <div>
              This tool is{" "}
              <a
                href="https://github.com/msfrisbie/trackandtrace.tools"
                target="_blank"
              >
                open source
              </a>
              , you can see the code to verify it is not sharing your scans.
            </div>
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
