import {
  email,
  forumUrl,
  githubReleasesUrl,
  githubUrl,
  mitLicenseUrl,
  webStoreUrl,
} from "../consts";

export default function FaqSection({ className }) {
  return (
    <div id="faq" className={`flex flex-col items-center ${className}`}>
      <div className="flex flex-col items-stretch max-w-md gap-16 my-16">
        <div className="text-center text-5xl font-light ttt-purple-text">
          FAQ
        </div>
        <div className="flex flex-col text-start items-stretch gap-8 text-lg">
          <div className="font-bold ttt-purple-text opacity-75">
            What is Track &amp; Trace Tools?
          </div>
          <div>
            Track &amp; Trace Tools (TTT) is an open source Chrome extension
            that integrates with Metrc to add extra features. It is not
            affiliated with Metrc.
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
            </a>
            .
          </div>
          <hr></hr>
          <div className="font-bold ttt-purple-text opacity-75">
            What does "open source" mean?
          </div>
          <div>
            The Track &amp; Trace Tools source code is{" "}
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
            You can read the MIT license{" "}
            <a
              href={mitLicenseUrl}
              target="_blank"
              className="ttt-purple-text underline"
            >
              here
            </a>
            . Some things to note:
            <ul className="list-disc ml-4 my-6 flex flex-col gap-4">
              <li>Track &amp; Trace Tools has no warranty of any kind.</li>
              <li>
                Track &amp; Trace Tools is provided as-is. The author cannot be
                held liable for the software, use at your own risk.
              </li>
            </ul>
          </div>
          <hr></hr>
          <div className="font-bold ttt-purple-text opacity-75">
            Where should I ask questions?
          </div>
          <div>
            Questions, bug reports, and feature requests should be posted in the{" "}
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
  );
}
