import { AxiosInstance } from "axios";

export interface Tag {
  _id: string;
  count: number;
}

export class TagsAPI {
  constructor(private client: AxiosInstance) {}

  async getTags(collectionId?: number) {
    const collection = collectionId ?? 0;
    const response = await this.client.get(`/tags/${collection}`);
    return response.data;
  }

  async deleteTag(tagName: string) {
    const response = await this.client.delete(`/tag/${tagName}`);
    return response.data;
  }
}
