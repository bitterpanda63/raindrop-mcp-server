import { AxiosInstance } from "axios";

export interface User {
  _id: number;
  fullName: string;
  email: string;
  registered: string;
  pro: boolean;
  groups: Array<{
    title: string;
    collections: number[];
    hidden: boolean;
    sort: number;
  }>;
}

export class UserAPI {
  constructor(private client: AxiosInstance) {}

  async getAuthenticatedUser() {
    const response = await this.client.get("/user");
    return response.data;
  }
}
