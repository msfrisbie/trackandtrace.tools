export default function OpenSourceCannabisProjectSection({ className }) {
  return (
    <div
      id="open-source-cannabis-project"
      className={`flex flex-col items-center px-6 ${className}`}
    >
      <div className="flex flex-col items-stretch max-w-md gap-16 my-16">
        <div className="text-2xl text-center ttt-purple-text italic opacity-70 mt-12">
          "Operators in the cannabis industry stand to massively benefit from
          open source software."
        </div>
        <div className="text-center text-5xl font-light ttt-purple-text">
          Open Source Cannabis Project
        </div>
        <div className="flex flex-col text-start items-stretch gap-8 text-lg">
          <div>
            The{" "}
            <span className="ttt-purple-text font-bold">
              Open Source Cannabis Project (OSCP)
            </span>{" "}
            is an initiative to support the struggling cannabis industry with
            high quality open source software. It builds around the following
            ideas:
          </div>

          <ul className="list-disc ml-4 flex flex-col gap-4">
            <li>
              The cannabis industry is grossly underserved in most sectors,
              especially software.
            </li>
            <li>
              The cannabis industry is dominated by private third-party
              software.
            </li>
            <li>
              Operators in the cannabis industry stand to massively benefit from
              open source software.
            </li>
          </ul>

          <div className="font-bold ttt-purple-text opacity-75">VISION</div>

          <div>
            The Open Source Cannabis Project helps build a world where the
            freedoms and opportunities enjoyed by all software industries are
            extended to the grossly underserved cannabis industry. The OSCP
            supports institutions and individuals working together to create
            communities of practice in which the healthy open source ecosystem
            thrives.
          </div>

          <div className="font-bold ttt-purple-text opacity-75">MISSION</div>

          <div>
            The Open Source Cannabis Project was created to advocate for the
            benefits of open source and to bridge the cannabis industry and open
            source community.
          </div>

          <div>
            Open source enables a development method for software that harnesses
            the power of distributed peer review and transparency of process.
            The promise of open source is higher quality, better reliability,
            greater flexibility, lower cost, and an end to predatory vendor
            lock-in.
          </div>

          <div>
            The Open Source Cannabis Project offers the promise of a nexus of
            trust around which developers, users, corporations and governments
            can organize open source cooperation.
          </div>
        </div>
      </div>
    </div>
  );
}
