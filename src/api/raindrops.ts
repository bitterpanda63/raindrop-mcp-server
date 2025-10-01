import { AxiosInstance } from "axios";
import {RaindropAPI} from "../raindrop-api.js";
import {UserAPI} from "./user.js";

export interface Raindrop {
  _id: number;
  title: string;
  excerpt: string;
  note: string;
  type: string;
  link: string;
  domain: string;
  cover: string;
  tags: string[];
  created: string;
  lastUpdate: string;
  collection: {
    $id: number;
  };
}

export interface GetRaindropsParams {
  collectionId?: number;
  search?: string;
  sort?: string;
}

export interface CreateRaindropParams {
  link: string;
  title?: string;
  excerpt?: string;
  note?: string;
  tags?: string[];
  collection?: number;
}

export interface UpdateRaindropParams {
  title?: string;
  excerpt?: string;
  note?: string;
  tags?: string[];
  collection?: number;
}

export class RaindropsAPI {
  constructor(private client: AxiosInstance) {}

  async getRaindrops(params: GetRaindropsParams = {}): Promise<Raindrop[]> {
    const { collectionId = 0, search, sort } = params;
    const perpage = 50;
    let page = 0;
    let allRaindrops: Raindrop[] = [];
    let hasMore = true;

    while (hasMore) {
      const response = await this.client.get(`/raindrops/${collectionId}`, {
        params: { page, perpage, search, sort },
      });

      const items = response.data.items || [];
      allRaindrops = allRaindrops.concat(items);

      if (items.length < perpage) {
        hasMore = false;
      } else {
        page++;
      }
    }

    return allRaindrops;
  }

  async getRaindrop(raindropId: number) {
    const response = await this.client.get(`/raindrop/${raindropId}`);
    return response.data;
  }

  async createRaindrop(params: CreateRaindropParams) {
    const response = await this.client.post("/raindrop", params);
    return response.data;
  }

  async updateRaindrop(raindropId: number, params: UpdateRaindropParams) {
    const response = await this.client.put(`/raindrop/${raindropId}`, params);
    return response.data;
  }

  async deleteRaindrop(raindropId: number) {
    const response = await this.client.delete(`/raindrop/${raindropId}`);
    return response.data;
  }
}