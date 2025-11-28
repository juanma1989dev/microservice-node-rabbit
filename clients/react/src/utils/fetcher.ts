import type { FetchOptions, FetchResponse } from "../types";

export async function fetcher<T>(
  url: string,
  options: FetchOptions = {}
): Promise<FetchResponse<T>> {
  const fetchConfig: RequestInit = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  if (options.body && options.method !== "GET") {
    fetchConfig.body = JSON.stringify(options.body);
  }

  const res = await fetch(url, fetchConfig);

  if (!res.ok) {
    let errorDetail = "Error en la solicitud.";
    try {
      const errorBody = await res.json();
      errorDetail = errorBody.message || JSON.stringify(errorBody);
    } catch {
      errorDetail = `Error ${res.status}: ${res.statusText}`;
    }
    throw new Error(errorDetail);
  }

  if (res.status === 204) {
    return { status: "success", data: null as T };
  }

  const FetchResponse: FetchResponse<T> = await res.json();

  return FetchResponse;
}
