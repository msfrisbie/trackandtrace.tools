import { faBarcode, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ScanModal() {
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showStepsModal, setShowStepsModal] = useState(false);
  const [scannerType, setScannerType] = useState("phone");
  const [tagType, setTagType] = useState("demo");

  const handleCloseFaqModal = () => setShowFaqModal(false);
  const handleCloseStepsModal = () => setShowStepsModal(false);
  const handleShowFaqModal = () => setShowFaqModal(true);
  const handleShowStepsModal = () => setShowStepsModal(true);

  let step1, step2, step3;

  if (scannerType === "phone" && tagType === "metrc") {
    step1 = (
      <li>
        <div>Get a Metrc tag to scan</div>
      </li>
    );
    step2 = (
      <li>
        <div>Open your phone scanner</div>
        <div className="text-black font-normal">
          Scan barcodes using Google Chrome on your phone. Click the{" "}
          <span className="ttt-purple-text font-bold">OPEN&nbsp;SCANNER</span>{" "}
          button to start scanning.
        </div>
      </li>
    );
    step3 = (
      <li>
        <div>Scan the tag</div>
        <div className="text-black font-normal">
          The phone scanner will read the tag and add it to this tag set.
        </div>
      </li>
    );
  }
  if (scannerType === "bluetooth" && tagType === "metrc") {
    step1 = (
      <li>
        <div>Get a Metrc tag to scan</div>
      </li>
    );
    step2 = (
      <li>
        <div>Set up your bluetooth scanner</div>
        <div className="text-black font-normal">
          Pair and connect your bluetooth scanner with this device.
        </div>
      </li>
    );
    step3 = (
      <li>
        <div>Scan the tag</div>
        <div className="text-black font-normal">
          This tool will detect bluetooth scans and add them to the tag set.
        </div>
      </li>
    );
  }
  if (scannerType === "phone" && tagType === "demo") {
    step1 = (
      <>
        <li>
          <div>Pair phone scanner</div>
          <div className="text-black font-normal mb-2">
            This configuration requires another phone to scan tags with.
          </div>
          <div className="text-black font-normal">
            On this device, click the{" "}
            <FontAwesomeIcon
              className="mx-1 ttt-purple-text text-lg"
              icon={faQrcode}
            />{" "}
            button to get the pair QR. Scan it with a phone to pair.
          </div>
        </li>
        <li>
          <div>Get a Demo tag to scan</div>
          <div className="text-black font-normal">
            On this device, click the{" "}
            <FontAwesomeIcon
              className="mx-1 ttt-purple-text text-lg"
              icon={faBarcode}
            />{" "}
            button to get a scannable demo tag.
          </div>
        </li>
      </>
    );
    step2 = (
      <li>
        <div>Open your phone scanner</div>
        <div className="text-black font-normal">
          On the paired phone, click the{" "}
          <span className="ttt-purple-text font-bold">OPEN&nbsp;SCANNER</span>{" "}
          button to start scanning. Only Google Chrome supports phone scanning.
        </div>
      </li>
    );
    step3 = (
      <li>
        <div>Scan the tag</div>
        <div className="text-black font-normal">
          The phone scanner will read the tag and add it to this tag set.
        </div>
      </li>
    );
  }
  if (scannerType === "bluetooth" && tagType === "demo") {
    step1 = (
      <li>
        <div>Get a Demo tag to scan</div>
        <div className="text-black font-normal">
          Click the{" "}
          <FontAwesomeIcon
            className="mx-1 ttt-purple-text text-lg"
            icon={faBarcode}
          />{" "}
          button to get a scannable demo tag.
        </div>
      </li>
    );
    step2 = (
      <li>
        <div>Set up your bluetooth scanner</div>
        <div className="text-black font-normal">
          Pair and connect your bluetooth scanner with this device.
        </div>
      </li>
    );
    step3 = (
      <li>
        <div>Scan the tag</div>
        <div className="text-black font-normal">
          This tool will detect bluetooth scans and add them to the tag set.
        </div>
      </li>
    );
  }

  return (
    <>
      <div className="flex flex-row justify-center gap-4">
        <Button variant="outline-primary" onClick={handleShowStepsModal}>
          {/* <FontAwesomeIcon icon={faQuestion} className="cursor-pointer" /> */}
          How do I use this?
        </Button>

        <Button variant="outline-primary" onClick={handleShowFaqModal}>
          {/* <FontAwesomeIcon icon={faQuestion} className="cursor-pointer" /> */}
          FAQ
        </Button>
      </div>

      <Modal show={showFaqModal} onHide={handleCloseFaqModal}>
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
              <li>Create unlimited tag sets</li>
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
          <Button variant="primary" onClick={handleCloseFaqModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showStepsModal} onHide={handleCloseStepsModal}>
        <Modal.Header closeButton>
          <Modal.Title>How to use</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 sm:grid-cols-2 mb-8 mx-8 gap-2 place-items-center">
            <div>What you're scanning:</div>
            <Form.Select
              size="sm"
              value={tagType}
              onChange={(e) => setTagType(e.target.value)}
            >
              <option value="demo">Demo tags</option>
              <option value="metrc">Metrc tags</option>
            </Form.Select>

            <div>What you're scanning with:</div>
            <Form.Select
              size="sm"
              value={scannerType}
              onChange={(e) => setScannerType(e.target.value)}
            >
              <option value="phone">Phone scanner</option>
              <option value="bluetooth">Bluetooth scanner</option>
            </Form.Select>
          </div>

          <ol className="flex flex-col gap-4 list-decimal ttt-purple-text font-semibold">
            {step1}
            {step2}
            {step3}
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseStepsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
