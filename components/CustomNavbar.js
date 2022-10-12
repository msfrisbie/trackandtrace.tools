import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faBarcode,
  faCode,
  faLightbulb,
  faQuestionCircle,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { forumUrl, githubUrl } from "../consts";
import logo from "../public/logo-square-1024.png";

export default function CustomNavbar() {
  const router = useRouter();
  const prefix = router.asPath === "/" ? "#" : "/";

  return (
    <>
      <div style={{ height: "60px" }}></div>
      <Navbar bg="white" expand="lg" fixed="top" collapseOnSelect>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand
            href="/"
            style={{ width: "40px", height: "40px", position: "relative" }}
          >
            <Image
              priority
              src={logo}
              alt={"Track & Trace Tools"}
              layout="fill"
              objectFit="contain"
            />
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto w-full justify-center sm:gap-8 ttt-purple-text-force">
              <Nav.Link
                href={prefix + "faq"}
                className=" opacity-80 hover:opacity-100"
              >
                <FontAwesomeIcon icon={faQuestionCircle} className="pr-2" /> FAQ
              </Nav.Link>
              <Nav.Link
                href={prefix + "scan"}
                className=" opacity-80 hover:opacity-100"
              >
                <FontAwesomeIcon icon={faBarcode} className="pr-2" /> SCAN
              </Nav.Link>
              <Nav.Link
                href={prefix + "open-source-cannabis-project"}
                className=" opacity-80 hover:opacity-100"
              >
                <FontAwesomeIcon icon={faCode} className="pr-2" /> OPEN SOURCE
              </Nav.Link>
              <Nav.Link
                href={prefix + "solutions"}
                className="opacity-80 hover:opacity-100"
              >
                <FontAwesomeIcon icon={faLightbulb} className="pr-2" />{" "}
                SOLUTIONS
              </Nav.Link>
              <Nav.Link
                target="_blank"
                href={githubUrl}
                className=" opacity-80 hover:opacity-100"
              >
                <FontAwesomeIcon icon={faGithub} className="pr-2" /> CODE
              </Nav.Link>
              <Nav.Link
                target="_blank"
                href={forumUrl}
                className=" opacity-80 hover:opacity-100"
              >
                <FontAwesomeIcon icon={faUserGroup} className="pr-2" />{" "}
                COMMUNITY
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
