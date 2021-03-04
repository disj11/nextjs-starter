import {RootStore, RootStoreInitializeData} from "./root_store";
import React from "react";
import {Provider} from "mobx-react";

let store: RootStore;

const initializeStore = (initialStoreState?: RootStoreInitializeData): RootStore => {
  const _store = store ?? new RootStore();

  if (initialStoreState) {
    _store.hydrate(initialStoreState);
  }

  if (typeof window === "undefined") {
    return _store;
  }

  if (!store) {
    store = _store;
  }

  return _store;
}

interface Props {
  initialStoreState?: RootStoreInitializeData,
}

export const StoreProvider: React.FC<Props> = ({children, initialStoreState}) => {
  const store = initializeStore(initialStoreState);
  return (
    <Provider {...store}>{children}</Provider>
  )
}