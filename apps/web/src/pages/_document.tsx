import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../styles";
import { markup } from "../utils";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
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
}
