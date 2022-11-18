import Header from "@components/Header";
import { forumUrl } from "../consts";

export default function Solutions() {
  return (
    <>
      <Header
        title="Uninstall | Track &amp; Trace Tools"
        url="https://www.trackandtrace.tools/uninstall"
        description="Uninstalled Track &amp; Trace Tools"
      ></Header>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center max-w-lg gap-12 px-6 text-center">
          <div className="text-3xl font-light ttt-purple-text pt-12">
            You've successfully uninstalled Track &amp; Trace Tools
          </div>

          <div className="">
            Sorry to see you go! Track &amp; Trace Tools is an open source
            project, any feedback you have would be really appreciated.
          </div>

          <div className="">
            Please report bugs, leave feedback, or request features in the{" "}
            <a href={forumUrl} target="_blank">
              Community Forum
            </a>
            .
          </div>
        </div>
      </div>
    </>
  );
}
