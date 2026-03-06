# Shibui - Prototype backend

## Version déployée

Cette API a été déployée sur Render et est disponible à l'adresse suivante : 
- URL : https://archi-rendu-4.onrender.com
- Documentation : https://archi-rendu-4.onrender.com/api/docs

**Attention :** Lors d'une période d'inactivité supérieure à 15min, le serveur Render se met en pause.
N'importe quel accès à l'API le réveillera, mais cela peut prendre quelques minutes.

Il est fortement conseillé de réveiller le serveur **AVANT** d'utiliser le prototype front-end.

## Prérequis

Avant de lancer le projet, il faut disposer des éléments suivants :
- Node.js
- npm
- une base de données PostgreSQL
- un projet Supabase configuré pour l’authentification et le stockage

### 1. Cloner le dépôt
```
git clone <url-du-repo-backend>
cd <nom-du-repo-backend>
```

### 2. Installer les dépendances
```
npm install
```

### 3. Configurer les variables d’environnement

Créer un fichier .env à la racine du projet, à partir du fichier `.env.example`.

### 4. Générer le client Prisma
```
npx prisma generate
```

Cette commande génère le client Prisma à partir du fichier schema.prisma.

### 5. Appliquer les migrations

Si les migrations sont déjà présentes dans le projet :

```
npx prisma migrate deploy
```

En environnement de développement, il est également possible d’utiliser :

```
npx prisma migrate dev
```

### 6. Lancer le serveur en développement
```
npm run start:dev
```
Le backend est alors accessible localement sur le port défini dans le fichier .env.

Par défaut : http://localhost:3000

### 7. Accéder à la documentation de l’API

Une fois le serveur lancé, la documentation de l’API est accessible à l’adresse suivante :

http://localhost:3000/docs/api

La base PostgreSQL doit être accessible avant le lancement du serveur.

Certaines routes nécessitent une authentification valide pour être testées.

Le frontend peut être lancé séparément afin de tester l’application dans un fonctionnement complet client–serveur.
