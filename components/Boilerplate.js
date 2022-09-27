import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faQuestionCircle,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Script from "next/script";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { forumUrl, githubUrl } from "../consts";
import logo from "../public/logo-square-1024.png";
import Header from "./Header";

export default function Boilerplate({ children }) {
  return (
    <>
      <Header
        title="Track &amp; Trace Tools"
        url="https://www.trackandtrace.tools"
        description="Supercharge your Metrc workflow"
      ></Header>

      <Script
        strategy="lazyOnload"
        src={"https://www.googletagmanager.com/gtag/js?id=G-0J5ZE5M42P"}
      />

      <Script strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-0J5ZE5M42P');
      `}
      </Script>

      <Navbar collapseOnSelect bg="white" expand="sm">
        <Container>
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto w-full justify-center sm:gap-8 ttt-purple-text-force">
              <Nav.Link href="#faq" className=" opacity-80 hover:opacity-100">
                <FontAwesomeIcon icon={faQuestionCircle} className="pr-2" /> FAQ
              </Nav.Link>
              <Nav.Link
                target="_blank"
                href={githubUrl}
                className=" opacity-80 hover:opacity-100"
              >
                <FontAwesomeIcon icon={faGithub} className="pr-2" /> SOURCE CODE
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

      {children}

      <footer className="flex flex-col items-center justify-center p-8 text-sm text-gray-300">
        Copyright Track &amp; Trace Tools 2022
      </footer>
    </>
  );
}
