import React from "react";
import App from "next/app";
import { ThemeProvider } from "../src/theme";
import { NextPageWithLayout } from "../src/types/server_type";
import { StoreProvider } from "../src/stores/StoreProvider";

class MyApp extends App {
  componentDidMount(): void {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    const Layout = (Component as NextPageWithLayout).Layout || React.Fragment;

    return (
      <StoreProvider initialStoreState={pageProps.initialStoreState}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </StoreProvider>
    );
  }
}

export default MyApp;
