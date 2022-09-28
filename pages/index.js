import FaqSection from "@components/FaqSection";
import OpenSourceCannabisProjectSection from "@components/OpenSourceCannabisProjectSection";
import SolutionsSection from "@components/SolutionsSection";
import { faChrome } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import { webStoreUrl } from "../consts";
import cultivatorTools from "../public/cultivator_tools.png";
import dashboard from "../public/dashboard.png";
import harvest from "../public/harvest.png";
import logo from "../public/logo-acronym-name-inverted-1024.png";
import packageContext from "../public/package_context.png";
import packageSearch from "../public/package_search.png";

export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col items-stretch">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-stretch max-w-md gap-12 sm:gap-8 min-h-screen">
            <div className="px-6 sm:px-0 flex flex-col items-center sm:mt-20">
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
            <h1 className="px-6 sm:px-0 text-4xl md:mb-16 font-light text-gray-700 text-center">
              <span className="ttt-purple-text font-medium">Supercharge</span>
              &nbsp;your Metrc&nbsp;workflow
            </h1>
            <div className="px-6 sm:px-0 mb-16 flex flex-col items-stretch">
              <a
                className="text-center text-lg font-medium px-12 py-6 text-2xl ttt-purple-text rounded-lg ttt-purple-border border hover:bg-purple-900 hover:text-white shadow-md cursor-pointer no-underline"
                href={webStoreUrl}
                target="_blank"
              >
                <FontAwesomeIcon icon={faChrome} className="pr-2" /> INSTALL FOR
                CHROME
              </a>
            </div>
          </div>
        </div>
        <div className="mb-16 flex flex-col items-center">
          <div className="max-w-4xl">
            <Carousel variant="dark">
              <Carousel.Item className="px-16 sm:px-24 py-24">
                <Image src={dashboard} alt={"Dashboard"} priority />
                <Carousel.Caption>
                  <div>
                    Easily navigate your licenses from the Track &amp; Trace
                    Tools dashboard.
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className="px-16 sm:px-24 py-24">
                <Image src={packageSearch} alt={"Package Search"} priority />

                <Carousel.Caption>
                  <div>
                    Search packages, transfers, plants, and tags right in the
                    page.
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className="px-16 sm:px-24 py-24">
                <Image
                  src={packageContext}
                  alt={"Package Context Menu"}
                  priority
                />

                <Carousel.Caption>
                  <div>Quickly access manifest and lab test PDFs.</div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className="px-16 sm:px-24 py-24">
                <Image
                  src={cultivatorTools}
                  alt={"Cultivator Tools"}
                  priority
                />

                <Carousel.Caption>
                  <div>
                    Track &amp; Trace Tools can manage plants, packages, sales,
                    tags, and transfers.
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className="px-16 sm:px-24 py-24">
                <Image src={harvest} alt={"Bulk Harvest"} priority />

                <Carousel.Caption>
                  <div>
                    Track &amp; Trace Tools can harvest, move, destroy, void,
                    and finalize in bulk.
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
        <FaqSection className="bg-purple-100"></FaqSection>
        <OpenSourceCannabisProjectSection></OpenSourceCannabisProjectSection>
        <SolutionsSection className="bg-purple-100"></SolutionsSection>
      </div>
    </>
  );
}
