# Build and run the Cost of Work Index MCP server (stdio).
# No API keys; the dataset is bundled, so the server answers offline.
FROM node:20-slim
WORKDIR /app
COPY . .
# devDependencies (typescript) are required for the tsc build step, so a plain
# install, not --omit=dev. Glama builds this image to introspect the server.
RUN npm ci && npm run build
ENTRYPOINT ["node", "dist/server.js"]
