# Raindrop MCP Server

A Model Context Protocol (MCP) server for [Raindrop.io](https://raindrop.io) bookmark management. This server enables AI assistants to interact with your Raindrop.io bookmarks, collections, tags, and more through the MCP protocol.

## Features

- **Raindrops (Bookmarks)**: Create, read, update, and delete bookmarks with automatic pagination
- **Collections**: Manage bookmark collections and nested hierarchies
- **Tags**: View and manage tags across your bookmarks
- **User**: Access authenticated user information
- **Highlights**: Create and manage highlights on bookmarks
- **Filters**: Access filtering options for your collections

## Prerequisites

- Node.js 18 or higher
- A Raindrop.io account
- Raindrop.io **test** Access token ([Get your token here](https://app.raindrop.io/settings/integrations))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/bitterpanda63/raindrop-mcp-server.git
cd raindrop-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
RAINDROP_TOKEN=your_raindrop_api_token_here
```

4. Build the project:
```bash
npm run build
```

## Usage

### Running the Server

Start the MCP server:
```bash
npm start
```

### Testing with MCP Inspector

Test the server using the MCP Inspector:
```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

This will open a web interface where you can test all available tools.

### Using with Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "raindrop": {
      "command": "node",
      "args": ["/absolute/path/to/raindrop-mcp/dist/index.js"],
      "env": {
        "RAINDROP_TOKEN": "your_raindrop_api_token_here"
      }
    }
  }
}
```

## Available Tools

### Raindrops (Bookmarks)
- `get_raindrops` - Get all raindrops from a collection (with automatic pagination)
- `get_raindrop` - Get a single raindrop by ID
- `create_raindrop` - Create a new bookmark
- `update_raindrop` - Update an existing bookmark
- `delete_raindrop` - Delete a bookmark

### Collections
- `get_collections` - Get root collections
- `get_child_collections` - Get child collections
- `get_collection` - Get a single collection by ID
- `create_collection` - Create a new collection
- `update_collection` - Update a collection
- `delete_collection` - Delete a collection

### Tags
- `get_tags` - Get all tags
- `delete_tag` - Delete a tag

### User
- `get_user` - Get authenticated user information

### Highlights
- `get_highlights` - Get highlights for a raindrop
- `create_highlight` - Create a highlight
- `delete_highlight` - Delete a highlight

### Filters
- `get_filters` - Get filters for a collection
- `get_suggested_filters` - Get suggested filters

## Development

Run in development mode with auto-rebuild:
```bash
npm run dev
```

## API Documentation

For detailed information about the Raindrop.io API, visit the [official documentation](https://developer.raindrop.io).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
