export interface Product {
  id: number;
  title: string;
  image: string;
  likes: number;
}

export interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: object | null;
  headers?: HeadersInit;
}

export interface FetchResponse<T> {
  status: string;
  data: T;
}
