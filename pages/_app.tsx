import {ThemeProvider} from '../src/theme'
import React from 'react'
import App, {AppContext, AppProps} from 'next/app'
import styles from '../styles/App.module.css'
import {RootStore, RootStoreInitializeData} from "../src/stores/root_store";
import {Provider} from "mobx-react";

interface Props {
    initialStoreState: RootStoreInitializeData,
}

interface State {
    rootStore: RootStore,
    style: React.CSSProperties,
}

class MyApp extends App {
    state: State = {
        rootStore: new RootStore(),
        style: {visibility: 'hidden'},
    };

    static async getInitialProps(appContext: AppContext) {
        const appProps = await App.getInitialProps(appContext);
        const initialStoreState = RootStore.INITIALIZE_DATA;

        return {
            ...appProps,
            initialStoreState,
        }
    }

    static getDerivedStateFromProps(props: AppProps<Props>, state: State) {
        state.rootStore.hydrate(props.pageProps.initialStoreState);
        return state;
    }

    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles)
        }

        this.setState({
            ...this.state,
            style: {},
        });
    }

    render() {
        const {Component, pageProps} = this.props;
        return (
            <Provider {...this.state.rootStore}>
                <div className={styles['app-container']} style={this.state.style}>
                    <ThemeProvider>
                        <div className={styles['content-container']}>
                            <Component {...pageProps} />
                        </div>
                    </ThemeProvider>
                </div>
            </Provider>
        )
    }
}

export default MyApp;