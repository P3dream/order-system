# Etapa 1: build
FROM node:20-alpine AS builder
WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm ci

# Copiar código
COPY . .

# Build do NestJS
RUN npm run build

# Etapa 2: runtime (mais leve)
FROM node:20-alpine AS runner
WORKDIR /app

# Copiar apenas o necessário
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Porta que o serviço vai escutar
EXPOSE 4000

# Rodar em produção
CMD ["npm", "run", "start:prod"]
