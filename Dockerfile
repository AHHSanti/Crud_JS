FROM node:22.6.0

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application dans le conteneur
COPY . .

# Exposer le port sur lequel l'application écoute (adaptez si nécessaire)
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
