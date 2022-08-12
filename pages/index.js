import Image from "next/image";
import logo_svg from "../public/logo-acronym-name-1024.png";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <div className="relative w-48 h-48 sm:w-96 sm:h-64 mt-12">
        <Image
          priority
          className=""
          src={logo_svg}
          alt={"Track & Trace Tools"}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <h1 className="text-4xl font-light text-gray-700">
        <span className="ttt-purple-text font-medium">Supercharge</span> your
        Metrc workflow
      </h1>
    </div>
  );
}
