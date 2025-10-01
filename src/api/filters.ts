import { AxiosInstance } from "axios";

export interface Filter {
  _id: string;
  count: number;
}

export class FiltersAPI {
  constructor(private client: AxiosInstance) {}

  async getFilters(collectionId?: number) {
    const collection = collectionId ?? 0;
    const response = await this.client.get(`/filters/${collection}`);
    return response.data;
  }

  async getSuggestedFilters(collectionId?: number, search?: string) {
    const collection = collectionId ?? 0;
    const response = await this.client.get(`/filters/suggested/${collection}`, {
      params: { search },
    });
    return response.data;
  }
}
