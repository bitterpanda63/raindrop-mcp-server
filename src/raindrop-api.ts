import axios, { AxiosInstance } from "axios";

export class RaindropAPI {
  private baseURL = "https://api.raindrop.io/rest/v1";
  private axiosInstance: AxiosInstance;

  constructor(bearerToken: string) {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  }

  /**
   * Get the axios instance for making authenticated API calls
   */
  getClient(): AxiosInstance {
    return this.axiosInstance;
  }
}