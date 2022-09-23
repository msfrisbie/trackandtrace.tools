import { faChrome, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import logo from "../public/logo-acronym-name-inverted-1024.png";

const webStoreUrl =
  "https://chrome.google.com/webstore/detail/dfljickgkbfaoiifheibjpejloipegcb";
const githubUrl = "https://github.com/msfrisbie/track-trace-tools";
const githubReleasesUrl =
  "https://github.com/msfrisbie/track-trace-tools/releases";
const forumUrl = "https://track-trace-tools.talkyard.net/latest";
const email = "msfrisbie+ttt@gmail.com";
const mitLicenseUrl =
  "https://github.com/msfrisbie/track-trace-tools/blob/master/LICENSE.md";

export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-stretch gap-12 sm:gap-8 max-w-md min-h-screen">
          <div></div>
          <div className="px-6 sm:px-0 flex flex-col items-center">
            <div className="relative h-36 w-full sm:h-48">
              <Image
                priority
                className=""
                src={logo}
                alt={"Track & Trace Tools"}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <h1 className="px-6 sm:px-0 text-4xl font-light text-gray-700 text-center">
            <span className="ttt-purple-text font-medium">Supercharge</span>
            &nbsp;your Metrc&nbsp;workflow
          </h1>
          <div className="px-6 sm:px-0 pt-8 flex flex-col items-stretch">
            <a
              className="text-center text-lg font-medium px-12 py-6 text-2xl ttt-purple-text rounded-lg ttt-purple-border border hover:bg-purple-900 hover:text-white shadow-lg"
              href={webStoreUrl}
              target="_blank"
            >
              <FontAwesomeIcon icon={faChrome} className="pr-2" /> INSTALL FOR
              CHROME
            </a>
          </div>
          <div className="px-6 sm:px-0 flex flex-col items-stretch">
            <a
              className="text-center text-lg font-medium px-12 py-6 text-2xl ttt-purple-text rounded-lg ttt-purple-border border hover:bg-purple-900 hover:text-white shadow-lg"
              href={githubUrl}
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithub} className="pr-2" /> SOURCE CODE
            </a>
          </div>
          <div className="px-6 sm:px-0 flex flex-col items-stretch">
            <a
              className="text-center text-lg font-medium px-12 py-6 text-2xl ttt-purple-text rounded-lg ttt-purple-border border hover:bg-purple-900 hover:text-white shadow-lg"
              href={forumUrl}
              target="_blank"
            >
              <FontAwesomeIcon icon={faUserGroup} className="pr-2" /> COMMUNITY
            </a>
          </div>
          <div className="text-center text-5xl font-light ttt-purple-text pt-20 pb-4">
            FAQ
          </div>
          <div className="pb-12 flex flex-col text-start items-stretch gap-8 text-lg p-8">
            <div className="font-bold ttt-purple-text opacity-75">
              What is Track &amp; Trace Tools?
            </div>
            <div>
              Track &amp; Trace Tools (TTT) is a Chrome extension that
              integrates with Metrc. It is not affiliated with Metrc.
            </div>
            <hr></hr>
            <div className="font-bold ttt-purple-text opacity-75">
              How do I get Track &amp; Trace Tools?
            </div>
            <div>
              <div>
                There are several ways of installing Track &amp; Trace Tools:
              </div>
              <ul className="list-disc ml-4 mt-6 flex flex-col gap-4">
                <li>
                  Install the{" "}
                  <a
                    className="ttt-purple-text underline"
                    href={webStoreUrl}
                    target="_blank"
                  >
                    Track &amp; Trace Tools extension
                  </a>{" "}
                  from the Chrome Web Store (recommended)
                </li>
                <li>
                  <a
                    className="ttt-purple-text underline"
                    href={githubReleasesUrl}
                    target="_blank"
                  >
                    Download a prebuilt release
                  </a>{" "}
                  and install it locally
                </li>
                <li>
                  <a
                    className="ttt-purple-text underline"
                    href={githubUrl}
                    target="_blank"
                  >
                    Build the extension from source
                  </a>{" "}
                  and install it locally
                </li>
              </ul>
            </div>
            <hr></hr>
            <div className="font-bold ttt-purple-text opacity-75">
              How do I request a custom feature?
            </div>
            <div>
              If you would like a custom feature made for your company,{" "}
              <a className="ttt-purple-text underline" href={email}>
                send an email
              </a>{" "}
              to ask about this.{" "}
            </div>
            <hr></hr>
            <div className="font-bold ttt-purple-text opacity-75">
              What does "open source" mean?
            </div>
            <div>
              The Track &amp; Trace Tools code is{" "}
              <a
                className="ttt-purple-text underline"
                href={githubUrl}
                target="_blank"
              >
                publicly available here
              </a>
              . It is released under the{" "}
              <a
                href={mitLicenseUrl}
                target="_blank"
                className="ttt-purple-text underline"
              >
                MIT license
              </a>
              .
            </div>
            <hr></hr>
            <div className="font-bold ttt-purple-text opacity-75">
              What does the MIT license mean?
            </div>
            <div>
              The MIT license can be found{" "}
              <a
                href={mitLicenseUrl}
                target="_blank"
                className="ttt-purple-text underline"
              >
                here
              </a>
              . There are a couple important provisions:
              <ul className="list-disc ml-4 my-6 flex flex-col gap-4">
                <li>Track &amp; Trace Tools has no warranty of any kind.</li>
                <li>
                  Track &amp; Trace Tools is provided as-is. The author cannot
                  be held liable for the software, use at your own risk.
                </li>
              </ul>
            </div>
            <hr></hr>
            <div className="font-bold ttt-purple-text opacity-75">
              Where should I ask questions?
            </div>
            <div>
              Questions, bug reports, and feature requests should be posted in
              the{" "}
              <a
                className="ttt-purple-text underline"
                href={forumUrl}
                target="_blank"
              >
                Track &amp; Trace Tools Forum
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
