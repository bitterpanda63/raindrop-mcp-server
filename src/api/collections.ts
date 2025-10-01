import { AxiosInstance } from "axios";

export interface Collection {
  _id: number;
  title: string;
  description: string;
  count: number;
  cover: string[];
  public: boolean;
  view: string;
  sort: number;
  created: string;
  lastUpdate: string;
  parent?: {
    $id: number;
  };
}

export interface CreateCollectionParams {
  title: string;
  description?: string;
  parent?: number;
  view?: string;
  sort?: number;
  public?: boolean;
}

export interface UpdateCollectionParams {
  title?: string;
  description?: string;
  parent?: number;
  view?: string;
  sort?: number;
  public?: boolean;
}

export class CollectionsAPI {
  constructor(private client: AxiosInstance) {}

  async getRootCollections() {
    const response = await this.client.get("/collections");
    return response.data;
  }

  async getChildCollections() {
    const response = await this.client.get("/collections/childrens");
    return response.data;
  }

  async getCollection(collectionId: number) {
    const response = await this.client.get(`/collection/${collectionId}`);
    return response.data;
  }

  async createCollection(params: CreateCollectionParams) {
    const response = await this.client.post("/collection", params);
    return response.data;
  }

  async updateCollection(collectionId: number, params: UpdateCollectionParams) {
    const response = await this.client.put(`/collection/${collectionId}`, params);
    return response.data;
  }

  async deleteCollection(collectionId: number) {
    const response = await this.client.delete(`/collection/${collectionId}`);
    return response.data;
  }
}
