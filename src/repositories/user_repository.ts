import axios from "axios";
import { ServerResponse, User } from "../types/server_type";

export class UserRepository {
  private static readonly API_URL =
    "https://jsonplaceholder.typicode.com/users";

  public static async getUsers(): Promise<ServerResponse<Array<User>>> {
    return axios.get(this.API_URL);
  }
}
