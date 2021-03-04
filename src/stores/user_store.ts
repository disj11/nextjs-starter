import { makeAutoObservable } from "mobx";
import { Store } from "./root_store";
import { User } from "../types/server_type";
import { UserRepository } from "../repositories/user_repository";

interface InitializeData {
  users: Array<User>;
}

export class UserStore implements Store<InitializeData> {
  private users: Array<User> = [];

  constructor() {
    makeAutoObservable(this);
  }

  public hydrate(initializeData: InitializeData): void {
    this.users = initializeData.users;
  }

  public async fetch(): Promise<void> {
    const { data, status, statusText } = await UserRepository.getUsers();
    if (status === 200) {
      this.users = data;
      return Promise.resolve();
    }
    return Promise.reject({
      status,
      statusText
    });
  }

  public getUsers(): Array<User> {
    return this.users;
  }
}
