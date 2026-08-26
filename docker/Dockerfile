# Un solo Dockerfile, quattro bersagli:
#   deps    -> installa le dipendenze (livello riusabile dalla cache)
#   dev     -> server di sviluppo con ricarica automatica
#   builder -> esegue la build e produce /app/build
#   site    -> nginx che serve il sito costruito (immagine da distribuire)
#
# Costruisci un bersaglio specifico con:
#   docker build -f docker/Dockerfile --target site -t docstainer .

ARG NODE_IMAGE=node:22-alpine

# --- dipendenze -------------------------------------------------------------
FROM ${NODE_IMAGE} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- sviluppo ---------------------------------------------------------------
FROM ${NODE_IMAGE} AS dev
WORKDIR /app
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
# --host 0.0.0.0 rende il server raggiungibile da fuori dal container.
# --poll evita che le modifiche fatte sull'host passino inosservate.
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "1000"]

# --- build ------------------------------------------------------------------
FROM ${NODE_IMAGE} AS builder
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- sito statico -----------------------------------------------------------
FROM nginx:1.27-alpine AS site
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q --spider http://localhost/ || exit 1
