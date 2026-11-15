#Node version and Base OS(slim or alpine)
FROM node:24-slim

ENV NODE_ENV=production

# user applications store at this location, it's Linux standard convention 
WORKDIR /usr/src/app 
RUN chown node:node /usr/src/app

# Exact pnpm version will lock at the time of image build through corepack
RUN corepack enable && corepack prepare pnpm@12.15.0 --activate


# Firstly copy only dependency files (layer caching)
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# After it copy remaining code, on name of non-root user
COPY --chown=node:node . .

USER node
EXPOSE 4000 

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

  # Express 5 + Node 24 direct run (no overhead of npm/pnpm) 
CMD ["node", "server.js"]