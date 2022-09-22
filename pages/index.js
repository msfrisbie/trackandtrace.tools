import Image from "next/image";
import logo from "../public/logo-acronym-name-inverted-1024.png";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-stretch gap-12 sm:gap-8 max-w-md min-h-screen">
        <div></div>
        <div class="px-6 sm:px-0 flex flex-col items-center">
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

        <div className="px-6 sm:px-0 py-8 flex flex-col items-stretch">
          <a
            className="text-center shadow-2xl text-lg font-medium px-12 py-6 text-2xl text-white rounded-lg bg-purple-900 hover:opacity-80"
            href="https://chrome.google.com/webstore/detail/dfljickgkbfaoiifheibjpejloipegcb"
            target="_blank"
          >
            INSTALL FOR CHROME
          </a>
        </div>

        <div className="px-6 sm:px-0 flex flex-col items-stretch">
          <a
            className="text-center text-lg font-medium px-12 py-6 text-2xl ttt-purple-text rounded-lg ttt-purple-border border hover:bg-purple-900 hover:text-white"
            href="https://msfrisbie.wixsite.com/track-trace-tools"
            target="_blank"
          >
            COMMUNITY
          </a>
        </div>
      </div>
    </div>
  );
}
