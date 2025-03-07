# ---------------------------------------
# Étape 1 : Build de l'application Vite
# ---------------------------------------
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------------------------------------
# Étape 2 : Image finale Nginx
# ---------------------------------------
FROM nginx:alpine

# Copie des fichiers buildés depuis l'étape 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Copie du script d'injection des variables
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Remplace la configuration Nginx par défaut si nécessaire
# COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
