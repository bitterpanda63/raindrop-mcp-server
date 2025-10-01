#!/usr/bin/env node
import "dotenv/config";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { RaindropAPI } from "./raindrop-api.js";
import { RaindropsAPI } from "./api/raindrops.js";
import { CollectionsAPI } from "./api/collections.js";
import { TagsAPI } from "./api/tags.js";
import { UserAPI } from "./api/user.js";
import { HighlightsAPI } from "./api/highlights.js";
import { FiltersAPI } from "./api/filters.js";

// Get Bearer token from environment variable
const RAINDROP_TOKEN = process.env.RAINDROP_TOKEN;
if (!RAINDROP_TOKEN) {
  console.error("Error: RAINDROP_TOKEN environment variable is required");
  process.exit(1);
}

// Initialize API clients
const raindropAPI = new RaindropAPI(RAINDROP_TOKEN);
const client = raindropAPI.getClient();

const raindropsAPI = new RaindropsAPI(client);
const collectionsAPI = new CollectionsAPI(client);
const tagsAPI = new TagsAPI(client);
const userAPI = new UserAPI(client);
const highlightsAPI = new HighlightsAPI(client);
const filtersAPI = new FiltersAPI(client);

const server = new Server(
  {
    name: "raindrop-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // Raindrops
      {
        name: "get_raindrops",
        description: "Get all raindrops (bookmarks) from a collection",
        inputSchema: {
          type: "object",
          properties: {
            collectionId: { type: "number", description: "Collection ID (0 for all)" },
            search: { type: "string", description: "Search query" },
            sort: { type: "string", description: "Sort order" },
          },
        },
      },
      {
        name: "get_raindrop",
        description: "Get a single raindrop by ID",
        inputSchema: {
          type: "object",
          properties: {
            raindropId: { type: "number", description: "Raindrop ID" },
          },
          required: ["raindropId"],
        },
      },
      {
        name: "create_raindrop",
        description: "Create a new raindrop (bookmark)",
        inputSchema: {
          type: "object",
          properties: {
            link: { type: "string", description: "URL to bookmark" },
            title: { type: "string", description: "Title" },
            excerpt: { type: "string", description: "Description" },
            note: { type: "string", description: "Note" },
            tags: { type: "array", items: { type: "string" }, description: "Tags" },
            collection: { type: "number", description: "Collection ID" },
          },
          required: ["link"],
        },
      },
      {
        name: "update_raindrop",
        description: "Update a raindrop",
        inputSchema: {
          type: "object",
          properties: {
            raindropId: { type: "number", description: "Raindrop ID" },
            title: { type: "string", description: "Title" },
            excerpt: { type: "string", description: "Description" },
            note: { type: "string", description: "Note" },
            tags: { type: "array", items: { type: "string" }, description: "Tags" },
            collection: { type: "number", description: "Collection ID" },
          },
          required: ["raindropId"],
        },
      },
      {
        name: "delete_raindrop",
        description: "Delete a raindrop",
        inputSchema: {
          type: "object",
          properties: {
            raindropId: { type: "number", description: "Raindrop ID" },
          },
          required: ["raindropId"],
        },
      },
      // Collections
      {
        name: "get_collections",
        description: "Get root collections",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_child_collections",
        description: "Get child collections",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_collection",
        description: "Get a single collection by ID",
        inputSchema: {
          type: "object",
          properties: {
            collectionId: { type: "number", description: "Collection ID" },
          },
          required: ["collectionId"],
        },
      },
      {
        name: "create_collection",
        description: "Create a new collection",
        inputSchema: {
          type: "object",
          properties: {
            title: { type: "string", description: "Collection title" },
            description: { type: "string", description: "Description" },
            parent: { type: "number", description: "Parent collection ID" },
            view: { type: "string", description: "View type" },
            sort: { type: "number", description: "Sort order" },
            public: { type: "boolean", description: "Public collection" },
          },
          required: ["title"],
        },
      },
      {
        name: "update_collection",
        description: "Update a collection",
        inputSchema: {
          type: "object",
          properties: {
            collectionId: { type: "number", description: "Collection ID" },
            title: { type: "string", description: "Collection title" },
            description: { type: "string", description: "Description" },
            parent: { type: "number", description: "Parent collection ID" },
            view: { type: "string", description: "View type" },
            sort: { type: "number", description: "Sort order" },
            public: { type: "boolean", description: "Public collection" },
          },
          required: ["collectionId"],
        },
      },
      {
        name: "delete_collection",
        description: "Delete a collection",
        inputSchema: {
          type: "object",
          properties: {
            collectionId: { type: "number", description: "Collection ID" },
          },
          required: ["collectionId"],
        },
      },
      // Tags
      {
        name: "get_tags",
        description: "Get all tags",
        inputSchema: {
          type: "object",
          properties: {
            collectionId: { type: "number", description: "Collection ID" },
          },
        },
      },
      {
        name: "delete_tag",
        description: "Delete a tag",
        inputSchema: {
          type: "object",
          properties: {
            tagName: { type: "string", description: "Tag name" },
          },
          required: ["tagName"],
        },
      },
      // User
      {
        name: "get_user",
        description: "Get authenticated user information",
        inputSchema: { type: "object", properties: {} },
      },
      // Highlights
      {
        name: "get_highlights",
        description: "Get highlights for a raindrop",
        inputSchema: {
          type: "object",
          properties: {
            raindropId: { type: "number", description: "Raindrop ID" },
          },
          required: ["raindropId"],
        },
      },
      {
        name: "create_highlight",
        description: "Create a highlight",
        inputSchema: {
          type: "object",
          properties: {
            raindropId: { type: "number", description: "Raindrop ID" },
            text: { type: "string", description: "Highlighted text" },
            color: { type: "string", description: "Highlight color" },
            note: { type: "string", description: "Note" },
          },
          required: ["raindropId", "text"],
        },
      },
      {
        name: "delete_highlight",
        description: "Delete a highlight",
        inputSchema: {
          type: "object",
          properties: {
            raindropId: { type: "number", description: "Raindrop ID" },
            highlightId: { type: "string", description: "Highlight ID" },
          },
          required: ["raindropId", "highlightId"],
        },
      },
      // Filters
      {
        name: "get_filters",
        description: "Get filters for a collection",
        inputSchema: {
          type: "object",
          properties: {
            collectionId: { type: "number", description: "Collection ID" },
          },
        },
      },
      {
        name: "get_suggested_filters",
        description: "Get suggested filters",
        inputSchema: {
          type: "object",
          properties: {
            collectionId: { type: "number", description: "Collection ID" },
            search: { type: "string", description: "Search query" },
          },
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      // Raindrops
      case "get_raindrops": {
        const raindrops = await raindropsAPI.getRaindrops(args as any);
        return {
          content: [{ type: "text", text: JSON.stringify(raindrops, null, 2) }],
        };
      }
      case "get_raindrop": {
        const raindrop = await raindropsAPI.getRaindrop((args as any).raindropId);
        return {
          content: [{ type: "text", text: JSON.stringify(raindrop, null, 2) }],
        };
      }
      case "create_raindrop": {
        const result = await raindropsAPI.createRaindrop(args as any);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
      case "update_raindrop": {
        const { raindropId, ...params } = args as any;
        const result = await raindropsAPI.updateRaindrop(raindropId, params);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
      case "delete_raindrop": {
        const result = await raindropsAPI.deleteRaindrop((args as any).raindropId);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      // Collections
      case "get_collections": {
        const collections = await collectionsAPI.getRootCollections();
        return {
          content: [{ type: "text", text: JSON.stringify(collections, null, 2) }],
        };
      }
      case "get_child_collections": {
        const collections = await collectionsAPI.getChildCollections();
        return {
          content: [{ type: "text", text: JSON.stringify(collections, null, 2) }],
        };
      }
      case "get_collection": {
        const collection = await collectionsAPI.getCollection((args as any).collectionId);
        return {
          content: [{ type: "text", text: JSON.stringify(collection, null, 2) }],
        };
      }
      case "create_collection": {
        const result = await collectionsAPI.createCollection(args as any);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
      case "update_collection": {
        const { collectionId, ...params } = args as any;
        const result = await collectionsAPI.updateCollection(collectionId, params);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
      case "delete_collection": {
        const result = await collectionsAPI.deleteCollection((args as any).collectionId);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      // Tags
      case "get_tags": {
        const tags = await tagsAPI.getTags((args as any)?.collectionId);
        return {
          content: [{ type: "text", text: JSON.stringify(tags, null, 2) }],
        };
      }
      case "delete_tag": {
        const result = await tagsAPI.deleteTag((args as any).tagName);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      // User
      case "get_user": {
        const user = await userAPI.getAuthenticatedUser();
        return {
          content: [{ type: "text", text: JSON.stringify(user, null, 2) }],
        };
      }

      // Highlights
      case "get_highlights": {
        const highlights = await highlightsAPI.getHighlights((args as any).raindropId);
        return {
          content: [{ type: "text", text: JSON.stringify(highlights, null, 2) }],
        };
      }
      case "create_highlight": {
        const result = await highlightsAPI.createHighlight(args as any);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
      case "delete_highlight": {
        const { raindropId, highlightId } = args as any;
        const result = await highlightsAPI.deleteHighlight(raindropId, highlightId);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      // Filters
      case "get_filters": {
        const filters = await filtersAPI.getFilters((args as any)?.collectionId);
        return {
          content: [{ type: "text", text: JSON.stringify(filters, null, 2) }],
        };
      }
      case "get_suggested_filters": {
        const { collectionId, search } = args as any;
        const filters = await filtersAPI.getSuggestedFilters(collectionId, search);
        return {
          content: [{ type: "text", text: JSON.stringify(filters, null, 2) }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Raindrop MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
