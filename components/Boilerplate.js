import Header from "./Header";

export default function Boilerplate({ children }) {
  return (
    <>
      <Header
        title="Track &amp; Trace Tools"
        url="https://www.trackandtrace.tools"
        description="Supercharge your Metrc workflow"
      ></Header>

      {/* <Script
        strategy="lazyOnload"
        src={"https://www.googletagmanager.com/gtag/js?id=G-0ETS0H9HMM"}
      />

      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0ETS0H9HMM', {
          page_path: window.location.pathname,
          });
      `}
      </Script> */}

      {children}

      <footer className="flex flex-col items-center justify-center p-8 text-sm text-gray-300">
        Copyright Track &amp; Trace Tools 2022
      </footer>
    </>
  );
}