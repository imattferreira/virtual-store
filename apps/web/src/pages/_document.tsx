import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../styles";
import { markup } from "../utils";

function Document() {
  return (
    <Html>
      <Head>
        <style id="stitches" dangerouslySetInnerHTML={markup(getCssText())} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
