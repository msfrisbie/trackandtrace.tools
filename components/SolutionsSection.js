import { email } from "consts";
import { Button } from "react-bootstrap";

export default function SolutionsSection({ className }) {
  return (
    <div id="solutions" className={`flex flex-col items-center ${className}`}>
      <div className="px-6 sm:px-0 flex flex-col items-stretch max-w-md py-20">
        <div className="text-center text-5xl font-light ttt-purple-text pb-4">
          Solutions
        </div>
        <div className="pb-12 flex flex-col text-start items-stretch gap-8 text-lg p-8">
          <div className="font-bold ttt-purple-text opacity-75">
            No two cannabis businesses are alike.
          </div>
          <div>
            The open source version of Track &amp; Trace Tools might not exactly
            match how your company does compliance. For companies who wish to
            add custom features, the Chrome extension supports add-ons that can
            be privately developed and deployed to your team.
          </div>
          <Button variant="primary" className="ttt-purple-bg" href={email}>
            CONTACT US
          </Button>
        </div>
      </div>
    </div>
  );
}
