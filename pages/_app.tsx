import React from "react";
import App, { AppContext, AppProps } from "next/app";
import { Provider } from "mobx-react";
import { ThemeProvider } from "../src/theme";
import { RootStore, RootStoreInitializeData } from "../src/stores/root_store";
import { NextPageWithLayout } from "../src/types/server_type";

interface Props {
  initialStoreState: RootStoreInitializeData;
}

interface State {
  rootStore: RootStore;
}

class MyApp extends App {
  state: State = {
    rootStore: new RootStore(),
  };

  static async getInitialProps(appContext: AppContext): Promise<any> {
    const appProps = await App.getInitialProps(appContext);
    const initialStoreState = RootStore.INITIALIZE_DATA;

    return {
      ...appProps,
      initialStoreState
    };
  }

  static getDerivedStateFromProps(props: AppProps<Props>, state: State): State {
    state.rootStore.hydrate(props.pageProps.initialStoreState);
    return state;
  }

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
      <Provider {...this.state.rootStore}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default MyApp;
