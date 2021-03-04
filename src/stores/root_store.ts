import { enableStaticRendering } from "mobx-react";
import { UserStore } from "./user_store";
import { User } from "../types/server_type";

const isServer = typeof window === "undefined";
enableStaticRendering(isServer);

export interface Store<T> {
  hydrate: (initializeData: T) => void;
}

export interface RootStoreInitializeData {
  users: Array<User>;
}

export class RootStore implements Store<RootStoreInitializeData> {
  public userStore: UserStore;

  constructor() {
    this.userStore = new UserStore();
  }

  public hydrate(initializeData: RootStoreInitializeData): void {
    this.userStore.hydrate(initializeData);
  }
}
