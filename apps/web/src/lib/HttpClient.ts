const API_URL = "http://localhost:3333";

type HttpMethods = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  body: Record<string, unknown>;
  headers?: Record<string, string>;
}

class HttpClient {
  constructor(private readonly url = API_URL) {}

  private async request<T extends object>(
    endpoint: string,
    method: HttpMethods,
    options: Partial<RequestOptions> = {}
  ) {
    const { body, headers } = options;

    try {
      const url = API_URL + endpoint;

      const response = await fetch(url, {
        body: JSON.stringify(body),
        headers,
        method,
      });

      if (response.ok) {
        const result = await response.json();

        // TODO improve
        if (result?.status && result.status > 299) {
          throw new Error("request error");
        }

        return result as T;
      }
    } catch (err) {
      throw new Error("request error");
    }
  }

  get<T extends object>(endpoint: string) {
    return this.request<T>(endpoint, "GET");
  }

  post<T extends object>(endpoint: string, options: RequestOptions) {
    return this.request<T>(endpoint, "POST", options);
  }

  put<T extends object>(endpoint: string, options: Partial<RequestOptions>) {
    return this.request<T>(endpoint, "PUT", options);
  }

  del<T extends object>(endpoint: string) {
    return this.request<T>(endpoint, "DELETE");
  }
}

export default HttpClient;
