# Build and run the Cost of Work Index MCP server (stdio).
# No API keys; the dataset is bundled, so the server answers offline.
FROM node:20-slim
WORKDIR /app
COPY . .
RUN npm ci --omit=dev && npm run build
ENTRYPOINT ["node", "dist/server.js"]
