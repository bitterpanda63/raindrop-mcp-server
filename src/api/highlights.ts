import { AxiosInstance } from "axios";

export interface Highlight {
  _id: string;
  text: string;
  color: string;
  note: string;
  created: string;
  lastUpdate: string;
  raindropRef: number;
}

export interface CreateHighlightParams {
  raindropId: number;
  text: string;
  color?: string;
  note?: string;
}

export class HighlightsAPI {
  constructor(private client: AxiosInstance) {}

  async getHighlights(raindropId: number) {
    const response = await this.client.get(`/raindrop/${raindropId}/highlights`);
    return response.data;
  }

  async createHighlight(params: CreateHighlightParams) {
    const { raindropId, ...data } = params;
    const response = await this.client.post(`/raindrop/${raindropId}/highlight`, data);
    return response.data;
  }

  async deleteHighlight(raindropId: number, highlightId: string) {
    const response = await this.client.delete(`/raindrop/${raindropId}/highlight/${highlightId}`);
    return response.data;
  }
}
