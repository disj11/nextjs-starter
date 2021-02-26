import { AxiosRequestConfig } from "axios";
import { NextPage } from "next";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface ServerResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request: any;
}

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  Layout?: any,
}